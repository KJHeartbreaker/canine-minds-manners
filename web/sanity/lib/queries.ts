import {defineQuery} from 'next-sanity'
import {
  settingsProjection,
  imageProjection,
  authorProjection,
  programCardProjection,
  classProjection,
  productProjection,
  postProjection,
  fileDownloadProjection,
} from './query-fragments'

/**
 * Settings query - used in layout for navigation and footer
 * This is fetched once and can be cached
 */
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0] {
    ${settingsProjection}
  }
`)

const postFields = /* groq */ `
  _id,
  title,
  slug {
    current
  },
  excerpt {
    portableTextBlock[] {
      ...,
      markDefs[] {
        _key,
        _type,
        _type == "internalLink" => {
          item -> {
            _id,
            _type,
            _type == "class" => {
              "slug": slug.current,
              "parentPage": parentPage-> {
                "parentSlug": slug.current
              }
            },
            _type == 'page' => {
              "slug": slug.current
            }
          }
        },
        _type == 'link' => {
          href,
          blank
        },
        _type != 'internalLink' && _type != 'link' => @
      }
    }
  },
  image {
    ${imageProjection}
  },
  "author": author-> {
    name,
    slug {
      current
    },
    picture {
      ${imageProjection}
    }
  }
`

export const getHomePageQuery = defineQuery(`
  *[_type == 'home'][0]{
    _id,
    _type,
    name,
    heading,
    subheading,
    "content": content[]{
      _key,
      _type,
      ...,
      _type == 'heroBanner' => {
        size,
        subheading,
        subHeadingColor,
        heading,
        headingColor,
        copy {
          portableTextBlock[] {
            ...,
            markDefs[] {
              _key,
              _type,
              _type == "internalLink" => {
                item -> {
                  _id,
                  _type,
                  _type == "class" => {
                    "slug": slug.current,
                    "parentPage": parentPage-> {
                      "parentSlug": slug.current
                    }
                  },
                  _type == 'page' => {
                    "slug": slug.current
                  }
                }
              },
              _type == 'link' => {
                href,
                blank
              },
              _type != 'internalLink' && _type != 'link' => @
            }
          }
        },
        copyColor,
        image {
          ${imageProjection}
        },
        overlay,
        cta {
          title,
          arrow,
          kind,
          link,
          fileDownload {
            ${fileDownloadProjection}
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          }
        },
        disabled
      },
      image {
        ${imageProjection}
      },
      "programs": programs[]{
        _type == 'reference' => @-> {
          ${programCardProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "trainers": trainers[]{
        _type == 'reference' => @-> {
          ${authorProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "classRefs": classRefs[]{
        _type == 'reference' => @-> {
          ${classProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "productsArr": productsArr[]{
        _type == 'reference' => @-> {
          ${productProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "posts": posts[]{
        _type == 'reference' => @-> {
          ${postProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "panels": panels[]{
        _type == 'reference' => @-> {
          _id,
          heading,
          copy,
          image {
            ${imageProjection}
          }
        }
      }[_type != 'reference' || @->._id != null],
      "testimonialsArr": testimonialsArr[] -> {
        _key,
        heading,
        copy,
      },
      "relatedResources": relatedResources[]{
        _type == 'reference' => @-> {
          _type == 'post' => {
            _type,
            _id,
            title,
            "slug": slug.current,
            author {
              _type == 'reference' => @-> {
                ${authorProjection}
              }
            },
            excerpt,
            coverImage {
              ${imageProjection}
            }
          },
          _type == 'resource' => {
            _type,
            _id,
            title,
            "slug": slug.current,
            excerpt,
            coverImage {
              ${imageProjection}
            }
          }
        }
      }[_type != 'reference' || @->._id != null],
      _type == 'customComponent' => {
        "rows": rows[]{
          _type,
          _key,
          _type == 'trainerRows' => {
            "trainers": trainers[]{
              _type == 'reference' => @-> {
                ${authorProjection}
              }
            }[_type != 'reference' || @->._id != null]
          },
          _type == 'galleryGrid' => {
            "galleryArr": galleryArr[] {
              alt,
              crop,
              hotspot,
              asset-> {
                _id,
                metadata {
                  lqip
                }
              }
            }
          },
          _type == 'aboutUsContainer' => {
            copy {
              portableTextBlock[] {
                ...,
                _type == 'cta' => {
                  title,
                  arrow,
                  kind,
                  link,
                  fileDownload {
                    ${fileDownloadProjection}
                  },
                  landingPageRoute-> {
                    _id,
                    "slug": slug.current,
                    _type
                  }
                },
                markDefs[] {
                  _key,
                  _type,
                  _type == "internalLink" => {
                    item -> {
                      _id,
                      _type,
                      _type == "class" => {
                        "slug": slug.current,
                        "parentPage": parentPage-> {
                          "parentSlug": slug.current
                        }
                      },
                      _type == 'page' => {
                        "slug": slug.current
                      }
                    }
                  },
                  _type == 'link' => {
                    href,
                    blank
                  },
                  _type != 'internalLink' && _type != 'link' => @
                }
              }
            },
            "iconCards": iconCards[]{
              heading,
              icon {
                ${imageProjection}
              },
              copy {
                portableTextBlock[] {
                  ...,
                  markDefs[] {
                    _key,
                    _type,
                    _type == "internalLink" => {
                      item -> {
                        _id,
                        _type,
                        _type == "class" => {
                          "slug": slug.current,
                          "parentPage": parentPage-> {
                            "parentSlug": slug.current
                          }
                        },
                        _type == 'page' => {
                          "slug": slug.current
                        }
                      }
                    },
                    _type == 'link' => {
                      href,
                      blank
                    },
                    _type != 'internalLink' && _type != 'link' => @
                  }
                }
              },
              cta {
                title,
                arrow,
                kind,
                link,
                fileDownload {
                  ${fileDownloadProjection}
                },
                landingPageRoute-> {
                  _id,
                  "slug": slug.current,
                  _type
                }
              }
            }
          }
        }
      },
      _type == 'postsGridContainer' => {
        "posts": posts[]{
          _type == 'reference' => @-> {
            _id,
            title,
            slug {
              current
            },
            excerpt {
              portableTextBlock[] {
                ...,
                markDefs[] {
                  _key,
                  _type,
                  _type == "internalLink" => {
                    item -> {
                      _id,
                      _type,
                      _type == "class" => {
                        "slug": slug.current,
                        "parentPage": parentPage-> {
                          "parentSlug": slug.current
                        }
                      },
                      _type == 'page' => {
                        "slug": slug.current
                      }
                    }
                  },
                  _type == 'link' => {
                    href,
                    blank
                  },
                  _type != 'internalLink' && _type != 'link' => @
                }
              }
            },
            image {
              ${imageProjection}
            },
            author -> {
              _id,
              name,
              slug {
                current
              },
              picture {
                ${imageProjection}
              }
            }
          }
        }[_type != 'reference' || @->._id != null]
      },
      _type == 'rowContainer' => {
        "rowContent": rowContent[]{
          _type,
          _key,
          alt,
          crop,
          hotspot,
          "asset": asset-> {
            _id,
            _type,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip,
              palette {
                dominant {
                  background
                }
              }
            }
          },
          heading,
          copy {
            portableTextBlock[] {
              ...,
              _type == 'cta' => {
                title,
                arrow,
                kind,
                link,
                fileDownload {
                  ${fileDownloadProjection}
                },
                landingPageRoute-> {
                  _id,
                  "slug": slug.current,
                  _type
                }
              },
              markDefs[] {
                _key,
                _type,
                _type == "internalLink" => {
                  item -> {
                    _id,
                    _type,
                    _type == "class" => {
                      "slug": slug.current,
                      "parentPage": parentPage-> {
                        "parentSlug": slug.current
                      }
                    },
                    _type == 'page' => {
                      "slug": slug.current
                    }
                  }
                },
                _type == 'link' => {
                  href,
                  blank
                },
                _type != 'internalLink' && _type != 'link' => @
              }
            }
          },
          portableTextBlock[] {
            ...,
            _type == 'cta' => {
              title,
              arrow,
              kind,
              link,
              fileDownload {
                ${fileDownloadProjection}
              },
              landingPageRoute-> {
                _id,
                "slug": slug.current,
                _type
              }
            },
            markDefs[] {
              _key,
              _type,
              _type == 'internalLink' => {
                item -> {
                  _id,
                  _type,
                  _type == "class" => {
                    "slug": slug.current,
                    "parentPage": parentPage-> {
                      "parentSlug": slug.current
                    }
                  },
                  _type == 'page' => {
                    "slug": slug.current
                  }
                }
              },
              _type == 'link' => {
                href,
                blank
              },
              _type != 'internalLink' && _type != 'link' => @
            }
          },
          icon,
          title,
          cta {
            title,
            arrow,
            kind,
            link,
            fileDownload {
              ${fileDownloadProjection}
            },
            landingPageRoute-> {
              _id,
              "slug": slug.current,
              _type
            }
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          },
          image {
            ${imageProjection}
          },
          carouselImages[] {
            ${imageProjection}
          }
        },
        "trainers": trainers[]{
          _type == 'reference' => @-> {
            ${authorProjection}
          }
        }[_type != 'reference' || @->._id != null],
        "galleryArr": galleryArr[] {
          alt,
          crop,
          hotspot,
          asset-> {
            _id,
            metadata {
              lqip
            }
          }
        }
      }
    },
  }
`)

export const blogLandingPageQuery = defineQuery(`
  *[_type == 'blogLandingPage'][0]{
    _id,
    _type,
    title,
    slug,
    overview,
    "content": content[]{
      ...,
      _type == 'heroBanner' => {
        _key,
        _type,
        size,
        subheading,
        subHeadingColor,
        heading,
        headingColor,
        copy {
          portableTextBlock[] {
            ...,
            markDefs[] {
              _key,
              _type,
              _type == "internalLink" => {
                item -> {
                  _id,
                  _type,
                  _type == "class" => {
                    "slug": slug.current,
                    "parentPage": parentPage-> {
                      "parentSlug": slug.current
                    }
                  },
                  _type == 'page' => {
                    "slug": slug.current
                  }
                }
              },
              _type == 'link' => {
                href,
                blank
              },
              _type != 'internalLink' && _type != 'link' => @
            }
          }
        },
        copyColor,
        image {
          ${imageProjection}
        },
        overlay,
        cta {
          title,
          arrow,
          kind,
          link,
          fileDownload {
            ${fileDownloadProjection}
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          }
        },
        disabled
      },
      image {
        ${imageProjection}
      },
      _type == 'postsGridContainer' => {
        "posts": posts[]{
          _type == 'reference' => @-> {
            _id,
            title,
            slug {
              current
            },
            excerpt {
              portableTextBlock[] {
                ...,
                markDefs[] {
                  _key,
                  _type,
                  _type == "internalLink" => {
                    item -> {
                      _id,
                      _type,
                      _type == "class" => {
                        "slug": slug.current,
                        "parentPage": parentPage-> {
                          "parentSlug": slug.current
                        }
                      },
                      _type == 'page' => {
                        "slug": slug.current
                      }
                    }
                  },
                  _type == 'link' => {
                    href,
                    blank
                  },
                  _type != 'internalLink' && _type != 'link' => @
                }
              }
            },
            image {
              ${imageProjection}
            },
            author -> {
              _id,
              name,
              slug {
                current
              },
              picture {
                ${imageProjection}
              }
            }
          }
        }[_type != 'reference' || @->._id != null]
      }
    }
  }
`)

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "content": content[]{
      _key,
      _type,
      ...,
      _type == 'heroBanner' => {
        size,
        subheading,
        subHeadingColor,
        heading,
        headingColor,
        copy {
          portableTextBlock[] {
            ...,
            markDefs[] {
              _key,
              _type,
              _type == "internalLink" => {
                item -> {
                  _id,
                  _type,
                  _type == "class" => {
                    "slug": slug.current,
                    "parentPage": parentPage-> {
                      "parentSlug": slug.current
                    }
                  },
                  _type == 'page' => {
                    "slug": slug.current
                  }
                }
              },
              _type == 'link' => {
                href,
                blank
              },
              _type != 'internalLink' && _type != 'link' => @
            }
          }
        },
        copyColor,
        image {
          ${imageProjection}
        },
        overlay,
        cta {
          title,
          arrow,
          kind,
          link,
          fileDownload {
            ${fileDownloadProjection}
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          }
        },
        disabled
      },
      image {
        ${imageProjection}
      },
      "programs": programs[]{
        _type == 'reference' => @-> {
          ${programCardProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "trainers": trainers[]{
        _type == 'reference' => @-> {
          ${authorProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "classRefs": classRefs[]{
        _type == 'reference' => @-> {
          ${classProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "productsArr": productsArr[]{
        _type == 'reference' => @-> {
          ${productProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "posts": posts[]{
        _type == 'reference' => @-> {
          ${postProjection}
        }
      }[_type != 'reference' || @->._id != null],
      "panels": panels[]{
        _type == 'reference' => @-> {
          _id,
          heading,
          copy,
          image {
            ${imageProjection}
          }
        }
      }[_type != 'reference' || @->._id != null],
      "testimonialsArr": testimonialsArr[] -> {
        _key,
        heading,
        copy,
      },
      "relatedResources": relatedResources[]{
        _type == 'reference' => @-> {
          _type == 'post' => {
            _type,
            _id,
            title,
            "slug": slug.current,
            author {
              _type == 'reference' => @-> {
                ${authorProjection}
              }
            },
            excerpt,
            coverImage {
              ${imageProjection}
            }
          },
          _type == 'resource' => {
            _type,
            _id,
            title,
            "slug": slug.current,
            excerpt,
            coverImage {
              ${imageProjection}
            }
          }
        }
      }[_type != 'reference' || @->._id != null],
      _type == 'customComponent' => {
        "rows": rows[]{
          _type,
          _key,
          _type == 'trainerRows' => {
            "trainers": trainers[]{
              _type == 'reference' => @-> {
                ${authorProjection}
              }
            }[_type != 'reference' || @->._id != null]
          },
          _type == 'galleryGrid' => {
            "galleryArr": galleryArr[] {
              alt,
              crop,
              hotspot,
              asset-> {
                _id,
                metadata {
                  lqip
                }
              }
            }
          },
          _type == 'aboutUsContainer' => {
            copy {
              portableTextBlock[] {
                ...,
                _type == 'cta' => {
                  title,
                  arrow,
                  kind,
                  link,
                  fileDownload {
                    ${fileDownloadProjection}
                  },
                  landingPageRoute-> {
                    _id,
                    "slug": slug.current,
                    _type
                  }
                },
                markDefs[] {
                  _key,
                  _type,
                  _type == "internalLink" => {
                    item -> {
                      _id,
                      _type,
                      _type == "class" => {
                        "slug": slug.current,
                        "parentPage": parentPage-> {
                          "parentSlug": slug.current
                        }
                      },
                      _type == 'page' => {
                        "slug": slug.current
                      }
                    }
                  },
                  _type == 'link' => {
                    href,
                    blank
                  },
                  _type != 'internalLink' && _type != 'link' => @
                }
              }
            },
            "iconCards": iconCards[]{
              heading,
              icon {
                ${imageProjection}
              },
              copy {
                portableTextBlock[] {
                  ...,
                  markDefs[] {
                    _key,
                    _type,
                    _type == "internalLink" => {
                      item -> {
                        _id,
                        _type,
                        _type == "class" => {
                          "slug": slug.current,
                          "parentPage": parentPage-> {
                            "parentSlug": slug.current
                          }
                        },
                        _type == 'page' => {
                          "slug": slug.current
                        }
                      }
                    },
                    _type == 'link' => {
                      href,
                      blank
                    },
                    _type != 'internalLink' && _type != 'link' => @
                  }
                }
              },
              cta {
                title,
                arrow,
                kind,
                link,
                fileDownload {
                  ${fileDownloadProjection}
                },
                landingPageRoute-> {
                  _id,
                  "slug": slug.current,
                  _type
                }
              }
            }
          }
        }
      },
      _type == 'postsGridContainer' => {
        "posts": posts[]{
          _type == 'reference' => @-> {
            _id,
            title,
            slug {
              current
            },
            excerpt {
              portableTextBlock[] {
                ...,
                markDefs[] {
                  _key,
                  _type,
                  _type == "internalLink" => {
                    item -> {
                      _id,
                      _type,
                      _type == "class" => {
                        "slug": slug.current,
                        "parentPage": parentPage-> {
                          "parentSlug": slug.current
                        }
                      },
                      _type == 'page' => {
                        "slug": slug.current
                      }
                    }
                  },
                  _type == 'link' => {
                    href,
                    blank
                  },
                  _type != 'internalLink' && _type != 'link' => @
                }
              }
            },
            image {
              ${imageProjection}
            },
            author -> {
              _id,
              name,
              slug {
                current
              },
              picture {
                ${imageProjection}
              }
            }
          }
        }[_type != 'reference' || @->._id != null]
      },
      _type == 'rowContainer' => {
        "rowContent": rowContent[]{
          _type,
          _key,
          alt,
          crop,
          hotspot,
          "asset": asset-> {
            _id,
            _type,
            url,
            metadata {
              dimensions {
                width,
                height,
                aspectRatio
              },
              lqip,
              palette {
                dominant {
                  background
                }
              }
            }
          },
          heading,
          copy {
            portableTextBlock[] {
              ...,
              _type == 'cta' => {
                title,
                arrow,
                kind,
                link,
                fileDownload {
                  ${fileDownloadProjection}
                },
                landingPageRoute-> {
                  _id,
                  "slug": slug.current,
                  _type
                }
              },
              markDefs[] {
                _key,
                _type,
                _type == "internalLink" => {
                  item -> {
                    _id,
                    _type,
                    _type == "class" => {
                      "slug": slug.current,
                      "parentPage": parentPage-> {
                        "parentSlug": slug.current
                      }
                    },
                    _type == 'page' => {
                      "slug": slug.current
                    }
                  }
                },
                _type == 'link' => {
                  href,
                  blank
                },
                _type != 'internalLink' && _type != 'link' => @
              }
            }
          },
          portableTextBlock[] {
            ...,
            _type == 'cta' => {
              title,
              arrow,
              kind,
              link,
              fileDownload {
                ${fileDownloadProjection}
              },
              landingPageRoute-> {
                _id,
                "slug": slug.current,
                _type
              }
            },
            markDefs[] {
              _key,
              _type,
              _type == 'internalLink' => {
                item -> {
                  _id,
                  _type,
                  _type == "class" => {
                    "slug": slug.current,
                    "parentPage": parentPage-> {
                      "parentSlug": slug.current
                    }
                  },
                  _type == 'page' => {
                    "slug": slug.current
                  }
                }
              },
              _type == 'link' => {
                href,
                blank
              },
              _type != 'internalLink' && _type != 'link' => @
            }
          },
          icon,
          title,
          cta {
            title,
            arrow,
            kind,
            link,
            fileDownload {
              ${fileDownloadProjection}
            },
            landingPageRoute-> {
              _id,
              "slug": slug.current,
              _type
            }
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          },
          image {
            ${imageProjection}
          },
          carouselImages[] {
            ${imageProjection}
          }
        },
        "trainers": trainers[]{
          _type == 'reference' => @-> {
            ${authorProjection}
          }
        }[_type != 'reference' || @->._id != null],
        "galleryArr": galleryArr[] {
          alt,
          crop,
          hotspot,
          asset-> {
            _id,
            metadata {
              lqip
            }
          }
        }
      }
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const homepageSitemap = defineQuery(`
  *[_type == "home"] {
    _id,
    _updatedAt
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    _id,
    title,
    subheader,
    slug {
      current
    },
    excerpt {
      portableTextBlock[] {
        ...,
        markDefs[] {
          _key,
          _type,
          _type == "internalLink" => {
            item -> {
              _id,
              _type,
              _type == "class" => {
                "slug": slug.current,
                "parentPage": parentPage-> {
                  "parentSlug": slug.current
                }
              },
              _type == 'page' => {
                "slug": slug.current
              }
            }
          },
          _type == 'link' => {
            href,
            blank
          },
          _type != 'internalLink' && _type != 'link' => @
        }
      }
    },
    image {
      ${imageProjection}
    },
    body {
      portableTextBlock[] {
        ...,
        _type == 'cta' => {
          title,
          arrow,
          kind,
          link,
          fileDownload {
            ${fileDownloadProjection}
          },
          landingPageRoute-> {
            _id,
            "slug": slug.current,
            _type
          }
        },
        markDefs[] {
          _key,
          _type,
          _type == "internalLink" => {
            item -> {
              _id,
              _type,
              _type == "class" => {
                "slug": slug.current,
                "parentPage": parentPage-> {
                  "parentSlug": slug.current
                }
              },
              _type == 'page' => {
                "slug": slug.current
              }
            }
          },
          _type == 'link' => {
            href,
            blank
          },
          _type != 'internalLink' && _type != 'link' => @
        }
      }
    },
    author -> {
      _id,
      name,
      slug {
        current
      },
      picture {
        ${imageProjection}
      }
    },
    date,
    _updatedAt
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

export const redirectsQuery = defineQuery(`
  *[_type == "redirect" && defined(source) && defined(destination)] {
    source,
    destination,
    permanent
  }
`)
