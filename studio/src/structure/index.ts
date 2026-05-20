import {CgShoppingCart} from 'react-icons/cg'
import {GiCobweb, GiGraduateCap, GiSittingDog} from 'react-icons/gi'
import {SlSpeech} from 'react-icons/sl'
import {RiStackFill} from 'react-icons/ri'
import {BsSignpostSplit, BsTelephone} from 'react-icons/bs'
import {GoHome, GoMegaphone, GoArrowSwitch} from 'react-icons/go'
import {GiSettingsKnobs} from 'react-icons/gi'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'

import {editorGuideListItem} from '../guide/structure/editorGuide'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

// Define singletons - these are single documents that should be accessible directly
const SINGLETONS = [
  {name: 'home', title: 'Home', icon: GoHome},
  {name: 'blogLandingPage', title: 'Blog', icon: GoMegaphone},
  {name: 'settings', title: 'Settings and Menus', icon: GiSettingsKnobs},
]

export const structure: StructureResolver = (S: StructureBuilder, context) =>
  S.list()
    .title('Content')
    .items([
      // Singletons at the top
      ...SINGLETONS.map((singleton) =>
        S.listItem()
          .title(singleton.title)
          .icon(singleton.icon)
          .child(S.document().schemaType(singleton.name).documentId(singleton.name)),
      ),
      // Contact page (specific page)
      S.listItem()
        .id('contact')
        .title('Contact')
        .icon(BsTelephone)
        .child(async () => {
          const client = context.getClient({apiVersion: '2025-09-25'})
          const contactId = await client.fetch<string | null>(
            '*[_type == "page" && slug.current == $slug][0]._id',
            {slug: 'contact'},
          )

          if (contactId) {
            return S.document().schemaType('page').documentId(contactId)
          }

          // If the Contact page doesn't exist yet, show a read-only list (no “Create”)
          // so editors don’t accidentally make multiple “Contact” pages.
          return S.documentList()
            .title('Contact')
            .schemaType('page')
            .filter('_type == "page" && slug.current == $slug')
            .params({slug: 'contact'})
            .initialValueTemplates([])
            .child((documentId) => S.document().schemaType('page').documentId(documentId))
        }),
      // Pages (excluding contact)
      S.listItem()
        .title('Pages')
        .icon(GiCobweb)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .filter('_type == "page" && slug.current != "contact"'),
        ),
      // Posts
      S.listItem()
        .title('Posts')
        .icon(BsSignpostSplit)
        .child(S.documentTypeList('post').title('Posts')),

      // Redirects
      S.listItem()
        .title('Redirects')
        .icon(GoArrowSwitch)
        .child(S.documentTypeList('redirect').title('Redirects')),
      // Divider
      S.divider(),
      // Our Team
      S.listItem()
        .title('Our Team')
        .icon(GiSittingDog)
        .child(S.documentTypeList('trainer').title('Trainers')),
      // Classes
      S.listItem()
        .title('Classes')
        .icon(GiGraduateCap)
        .child(S.documentTypeList('class').title('Classes')),
      // Resources
      S.listItem()
        .title('Resources')
        .icon(RiStackFill)
        .child(S.documentTypeList('resource').title('Resources')),
      // Products
      S.listItem()
        .title('Products')
        .icon(CgShoppingCart)
        .child(S.documentTypeList('product').title('Products')),
      // Testimonials
      S.listItem()
        .title('Testimonials')
        .icon(SlSpeech)
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.divider(),
      editorGuideListItem(S),
    ])
