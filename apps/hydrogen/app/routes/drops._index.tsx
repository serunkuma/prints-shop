import {redirect} from 'react-router';

export async function loader() {
  return redirect('/blog/drops', 301);
}

export default function DropsIndexRedirect() {
  return null;
}
