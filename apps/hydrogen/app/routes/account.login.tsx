import {redirect} from 'react-router';

export async function loader({context}: {context: any}) {
  if (!context.customerAccount) {
    return redirect('/account');
  }

  return context.customerAccount.login();
}
