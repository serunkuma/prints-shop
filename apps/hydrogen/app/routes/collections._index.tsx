import {redirect} from 'react-router';

export async function loader() {
  return redirect('/collection', 301);
}

export default function CollectionsRedirect() {
  return null;
}
