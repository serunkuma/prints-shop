import {TrashIcon} from '@sanity/icons'
import {Stack, Text, useToast} from '@sanity/ui'
import {useClient, type DocumentActionDescription, type DocumentActionConfirmDialogProps} from 'sanity'
import {useRouter} from 'sanity/router'
import {useState} from 'react'
import {SANITY_API_VERSION} from '../../constants'
import type {ShopifyDocument, ShopifyDocumentActionProps} from './types'

export default (props: ShopifyDocumentActionProps): DocumentActionDescription | undefined => {
  const {draft, type, published} = props
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const toast = useToast()
  const client = useClient({apiVersion: SANITY_API_VERSION})

  let dialog: DocumentActionConfirmDialogProps | null = null

  if (type === 'product') {
    dialog = {
      message: (
        <Stack space={4}>
          <Text>Delete the current product and all associated variants in your dataset.</Text>
          <Text weight="medium">No content on Shopify will be deleted.</Text>
        </Stack>
      ),
      onCancel: () => setDialogOpen(false),
      onConfirm: async () => {
        const productId = published?.store?.id
        let productVariantIds: string[] = []
        if (productId) {
          productVariantIds = await client.fetch(
            `*[_type == "productVariant" && store.productId == $productId]._id`,
            {productId},
          )
        }
        const transaction = client.transaction()
        if (published?._id) transaction.delete(published._id)
        if (draft?._id) transaction.delete(draft._id)
        productVariantIds?.forEach((documentId) => {
          if (documentId) {
            transaction.delete(documentId)
            transaction.delete(`drafts.${documentId}`)
          }
        })
        try {
          await transaction.commit()
          router.navigateUrl({path: '/structure/products'})
        } catch (err) {
          toast.push({
            status: 'error',
            title: err instanceof Error ? err.message : 'Unknown Error',
          })
        } finally {
          setDialogOpen(false)
        }
      },
      type: 'confirm',
    }
  }

  if (type === 'collection') {
    dialog = {
      message: (
        <Stack space={4}>
          <Text>Delete the current collection in your dataset.</Text>
          <Text weight="medium">No content on Shopify will be deleted.</Text>
        </Stack>
      ),
      onCancel: () => setDialogOpen(false),
      onConfirm: async () => {
        const transaction = client.transaction()
        if (published?._id) transaction.delete(published._id)
        if (draft?._id) transaction.delete(draft._id)
        try {
          await transaction.commit()
          router.navigateUrl({path: '/structure/collections'})
        } catch (err) {
          toast.push({
            status: 'error',
            title: err instanceof Error ? err.message : 'Unknown Error',
          })
        } finally {
          setDialogOpen(false)
        }
      },
      type: 'confirm',
    }
  }

  if (!dialog) return

  return {
    tone: 'critical',
    dialog: dialogOpen && dialog,
    icon: TrashIcon,
    label: 'Delete',
    onHandle: () => setDialogOpen(true),
    shortcut: 'Ctrl+Alt+D',
  }
}
