import {redirect} from 'react-router';

export function loader() {
  return redirect('/pages/shipping-returns', 301);
}

export default function ShippingRedirect() {
  return null;
}
