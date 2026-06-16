import {redirect} from 'react-router';

export async function loader({request, context}: {request: Request; context: any}) {
  if (!context.customerAccount) {
    return redirect('/account');
  }

  return context.customerAccount.authorize();
}
