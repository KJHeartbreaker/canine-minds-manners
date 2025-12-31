// Singletons
import {blogLandingPage} from './singletons/blog'
import {home} from './singletons/home'
import {settings} from './singletons/settings'

// Documents
import {page} from './documents/page'
import {post} from './documents/post'
import {classDocument} from './documents/class'
import {product} from './documents/product'
import {resource} from './documents/resource'
import {testimonial} from './documents/testimonial'
import {trainer} from './documents/trainer'

// Objects - Cards
import {iconCard} from './objects/cards/iconCard'
import {imageButtonCard} from './objects/cards/imageButtonCard'

// Objects - Classes
import {classRowsContainer} from './objects/classes/classRowsContainer'

// Objects - Custom Components
import {aboutUsContainer} from './objects/customComponents/aboutUsContainer'
import {contactPageMap} from './objects/customComponents/contactPageMap'
import {customComponent} from './objects/customComponents/customComponent'
import {galleryGrid} from './objects/customComponents/galleryGrid'
import {trainerRows} from './objects/customComponents/trainerRows'

// Objects - Grids
import {postsGridContainer} from './objects/grids/postsGrid'
import {productGridContainer} from './objects/grids/productGridContainer'
import {programsGridContainer} from './objects/grids/programsGridContainer'
import {testimonialGridContainer} from './objects/grids/testimonialGridContainer'
import {trainersGridContainer} from './objects/grids/trainersGridContainer'

// Objects - Helpers
import {dateTime} from './objects/helpers/dateTime'

// Objects - Navigation Components
import {navCTA} from './objects/navigationComponents/navCTA'
import {navDropdownCTA} from './objects/navigationComponents/navDropdownCTA'

// Objects - Page Elements
import {acuityForm} from './objects/pageElements/acuityForm'
import {carousel} from './objects/pageElements/carousel'
import {cta} from './objects/pageElements/cta'
import {form} from './objects/pageElements/form'
import {heroBanner} from './objects/pageElements/heroBanner'
import {icon} from './objects/pageElements/icon'
import {logo} from './objects/pageElements/logo'
import {logoRow} from './objects/pageElements/logoRowContainer'
import {mainImage} from './objects/pageElements/mainImage'
import {youtube} from './objects/pageElements/youtube'

// Objects - Portable Text
import {mainPortableText} from './objects/portableText/mainPortableText'
import {simplePortableText} from './objects/portableText/simplePortableText'

// Objects - Rows
import {relatedResourcesRow} from './objects/rows/relatedResourcesRow'
import {rowContainer} from './objects/rows/rowContainer'
import {singleColumnContentBlock} from './objects/rows/singleColumnContentBlock'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  blogLandingPage,
  home,
  // Documents
  page,
  post,
  classDocument,
  product,
  resource,
  testimonial,
  trainer,
  // Objects - Cards
  iconCard,
  imageButtonCard,
  // Objects - Classes
  classRowsContainer,
  // Objects - Custom Components
  aboutUsContainer,
  contactPageMap,
  customComponent,
  galleryGrid,
  trainerRows,
  // Objects - Grids
  postsGridContainer,
  productGridContainer,
  programsGridContainer,
  testimonialGridContainer,
  trainersGridContainer,
  // Objects - Helpers
  dateTime,
  // Objects - Navigation Components
  navCTA,
  navDropdownCTA,
  // Objects - Page Elements
  acuityForm,
  carousel,
  cta,
  form,
  heroBanner,
  icon,
  logo,
  logoRow,
  mainImage,
  youtube,
  // Objects - Portable Text
  mainPortableText,
  simplePortableText,
  // Objects - Rows
  relatedResourcesRow,
  rowContainer,
  singleColumnContentBlock,
]
