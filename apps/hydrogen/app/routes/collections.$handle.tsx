import {redirect} from 'react-router';

export async function loader({params}: {params: any}) {
  return redirect(`/collection/${params.handle}`, 301);
}

export default function CollectionsHandleRedirect() {
  return null;
}
