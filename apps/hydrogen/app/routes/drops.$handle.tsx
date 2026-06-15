import {redirect} from 'react-router';

export async function loader({params}: {params: any}) {
  return redirect(`/blog/drops/${params.handle}`, 301);
}

export default function DropsHandleRedirect() {
  return null;
}
