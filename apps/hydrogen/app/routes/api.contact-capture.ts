import {data} from 'react-router';

export async function loader() {
  return data({error: 'Use POST to submit contact capture'}, {status: 405});
}

function hashIp(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash.toString(36);
}

const VALID_SOURCES = [
  'newsletter_footer',
  'ai_studio_waitlist',
  'homepage_ai_cta',
  'account_preferences',
  'checkout',
] as const;

const VALID_INTERESTS = ['opening_drop', 'ai_studio', 'tales_of_kuma', 'collectors'] as const;

export async function action({request, context}: {request: Request; context: any}) {
  if (request.method !== 'POST') {
    return data({error: 'Method not allowed'}, {status: 405});
  }

  const env = context.env as Env;
  const formData = await request.formData();

  const email = formData.get('email') as string | null;
  const phone = formData.get('phone') as string | null;
  const source = formData.get('source') as string | null;
  const interestsRaw = formData.get('interests') as string | null;
  const emailConsent = formData.get('emailConsent') === 'true';
  const emailConsentText = formData.get('emailConsentText') as string | null;
  const smsConsent = formData.get('smsConsent') === 'true';
  const smsConsentText = formData.get('smsConsentText') as string | null;
  const sourcePage = formData.get('sourcePage') as string | null;

  if (!email || !email.includes('@')) {
    return data({error: 'Valid email is required'}, {status: 400});
  }

  if (!source || !VALID_SOURCES.includes(source as typeof VALID_SOURCES[number])) {
    return data({error: 'Invalid source'}, {status: 400});
  }

  if (!emailConsent) {
    return data({error: 'Email consent is required'}, {status: 400});
  }

  if (!emailConsentText?.trim()) {
    return data({error: 'Email consent text is required'}, {status: 400});
  }

  if (smsConsent && !phone) {
    return data({error: 'Phone is required for SMS consent'}, {status: 400});
  }

  if (smsConsent && !smsConsentText?.trim()) {
    return data({error: 'SMS consent text is required'}, {status: 400});
  }

  const now = new Date().toISOString();
  const cleanedPhone = phone ? phone.replace(/[\s\-\(\)\.]/g, '') : undefined;
  const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('cf-connecting-ip')
    || 'unknown';

  const interests = interestsRaw
    ? interestsRaw
      .split(',')
      .map((interest) => interest.trim())
      .filter((interest): interest is typeof VALID_INTERESTS[number] =>
        VALID_INTERESTS.includes(interest as typeof VALID_INTERESTS[number]),
      )
    : undefined;

  const doc: Record<string, unknown> = {
    _type: 'contactCapture',
    email: email.toLowerCase().trim(),
    phone: cleanedPhone,
    firstName: formData.get('firstName') || undefined,
    lastName: formData.get('lastName') || undefined,
    source,
    interests,
    emailConsent,
    emailConsentText: emailConsentText.trim(),
    emailConsentedAt: emailConsent ? now : undefined,
    smsConsent,
    smsConsentText: smsConsent ? smsConsentText?.trim() : '',
    smsConsentedAt: smsConsent ? now : undefined,
    sourcePage: sourcePage || undefined,
    userAgent: request.headers.get('user-agent') || '',
    ipAddress: hashIp(ipAddress),
    createdAt: now,
  };

  const projectId = env.SANITY_PROJECT_ID;
  const dataset = env.SANITY_DATASET || 'production';
  const apiVersion = env.SANITY_API_VERSION || '2026-06-01';
  const token = env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    console.error('SANITY_API_WRITE_TOKEN is not configured');
    return data({error: 'Server configuration error'}, {status: 500});
  }

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      mutations: [{create: doc}],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Sanity mutation failed:', errorText);
    return data({error: 'Failed to save contact'}, {status: 500});
  }

  return data({success: true});
}
