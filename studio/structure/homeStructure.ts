import type {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Home')
    .schemaType('homepage')
    .child(S.editor().title('Home').schemaType('homepage').documentId('homepage')),
)
