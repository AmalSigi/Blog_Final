export class postData {
  public postData = [
    {
      id: 1,
      heading: 'The Art of War',
      dynamicFormArray:[{id: 1, type: 'paragraph', content: 'oioyuoihujkhjklh oyuoyioyuioutiuti iuiuyoyioutityiujkhkuiouiuikukjkuouyioui iuiuiu', dataURL: null},
    {id: 2, type: 'subHeading', content: 'uoioyuiuyiuiukjkyuiuiuiukjhkuuiiiiuiuiu', dataURL: null}]
     
    },

    {
      id: 2,
      title: 'Pride and Prejudice',
      content:
        'Pride and Prejudice is a novel by Jane Austen, following the romantic entanglements of the Bennett sisters as they navigate societal norms.',
      author: 'Jane Austen',
      category: 'Fiction',
      subcategory: 'Romance',
      image: 'https://picsum.photos/200/300',
      date: '1813',
      views: 2,
    },

    {
      id: 3,
      title: 'Cosmos',
      content:
        'Cosmos is a popular science book by Carl Sagan, exploring various scientific topics from astronomy to the origins of life.',
      author: 'Carl Sagan',
      category: 'Science',
      subcategory: 'Astronomy',
      image: 'https://picsum.photos/200/300',
      date: '1980',
      views: 2,
    },

    {
      id: 4,
      title: 'The Elements of Style',
      content:
        'The Elements of Style is a writing guide by William Strunk Jr. and E.B. White, offering essential rules of English language usage and composition.',
      author: 'William Strunk Jr., E.B. White',
      category: 'Language',
      subcategory: 'Writing',
      image: 'https://picsum.photos/200/300',
      date: '1918',
      views: 2,
    },

    {
      id: 5,
      title: 'The Theory of Everything',
      content:
        'The Theory of Everything is a biographical film based on the life of physicist Stephen Hawking and his scientific contributions.',
      author: 'James Marsh (Director)',
      category: 'Biography',
      subcategory: 'Physics',
      image: 'https://picsum.photos/200/300',
      date: '2014',
      views: 2,
    },

    {
      id: 6,
      title: 'The Catcher in the Rye',
      content:
        'The Catcher in the Rye is a novel by J.D. Salinger, following the story of Holden Caulfield and his experiences in New York City.',
      author: 'J.D. Salinger',
      category: 'Fiction',
      subcategory: 'Coming-of-Age',
      image: 'https://picsum.photos/200/300',
      date: '1951',
      views: 2,
    },

    {
      id: 7,
      title: 'Sapiens: A Brief History of Humankind',
      content:
        'Sapiens is a book by Yuval Noah Harari, providing a sweeping history of human evolution and the development of civilizations.',
      author: 'Yuval Noah Harari',
      category: 'History',
      subcategory: 'Anthropology',
      image: 'https://picsum.photos/200/300',
      date: '2011',
      views: 2,
    },

    {
      id: 8,
      title: 'The Great Gatsby',
      content:
        'The Great Gatsby is a novel by F. Scott Fitzgerald, capturing the extravagant and mysterious life of Jay Gatsby in the 1920s.',
      author: 'F. Scott Fitzgerald',
      category: 'Fiction',
      subcategory: 'Classic',
      image: 'https://picsum.photos/200/300',
      date: '1925',
      views: 2,
    },

    {
      id: 9,
      title: 'The Power of Habit',
      content:
        'The Power of Habit is a book by Charles Duhigg, exploring the science of habits, their formation, and how to change them effectively.',
      author: 'Charles Duhigg',
      category: 'Self-Help',
      subcategory: 'Psychology',
      image: 'https://picsum.photos/200/300',
      date: '2012',
      views: 2,
    },

    {
      id: 10,
      title: 'The Origin of Species',
      content:
        'The Origin of Species is a groundbreaking work by Charles Darwin, presenting the theory of evolution through natural selection.',
      author: 'Charles Darwin',
      category: 'Science',
      subcategory: 'Biology',
      image: 'https://picsum.photos/200/300',
      date: '1859',
      views: 2,
    },
  ];

  public Themes =
    // dummy-data.json
    [
      {
        id: 1,
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd3XIFDLTuh8T1Uc1xIMl7FG1EGnx3vxeRMA&usqp=CAU',
        imageName: 'Image 1',
      },
      {
        id: 2,
        src: 'https://neilpatel.com/wp-content/uploads/2021/10/extra-Best-WordPress-Themes-for-Blogs.webp',
        imageName: 'Image 2',
      },
      {
        id: 3,
        src: 'https://cdn2.wpbeginner.com/wp-content/uploads/2019/03/hueman.jpg',
        imageName: 'Image 3',
      },
      {
        id: 4,
        src: 'https://aws.wideinfo.org/tryknow.com/wp-content/uploads/2022/03/10115418/best-free-wordpress-blog-themes-2021-1.jpg',
        imageName: 'Image 4',
      },
      {
        id: 5,
        src: 'https://images04.nicepage.com/feature/461183/website-blog.jpg',
        imageName: 'Image 5',
      },
      {
        id: 6,
        src: 'https://i0.wp.com/themes.svn.wordpress.org/online-blog/1.1.6/screenshot.png',
        imageName: 'Image 6',
      },
    ];

  public Category = [
    {
      id: 1,
      category_name: 'Fashion',
      subcategories: [
        { id: 1, name: 'Subcategory1' },
        { id: 2, name: 'Subcategory2' },
        { id: 3, name: 'Subcategory3' },
      ],
    },
    {
      id: 2,
      category_name: 'Health',
      subcategories: [
        { id: 1, name: 'Subcategory1' },
        { id: 2, name: 'Subcategory2' },
        { id: 3, name: 'Subcategory3' },
      ],
    },
    {
      id: 3,
      category_name: 'Sports',
      subcategories: [
        { id: 1, name: 'Subcategory1' },
        { id: 2, name: 'Subcategory2' },
        { id: 3, name: 'Subcategory3' },
      ],
    },
    {
      id: 4,
      category_name: 'Technology',
      subcategories: [
        { id: 1, name: 'Subcategory1' },
        { id: 2, name: 'Subcategory2' },
        { id: 3, name: 'Subcategory3' },
      ],
    },
    {
      id: 5,
      category_name: 'Health',
      subcategories: [
        { id: 1, name: 'Subcategory1' },
        { id: 2, name: 'Subcategory2' },
        { id: 3, name: 'Subcategory3' },
      ],
    },
  ];

  public Tags = [
    {
      date: '2023-07-01',
      id: 12345,
      tag_name: 'Technology',
      num_posts: 15,
    },
    {
      date: '2023-07-02',
      id: 67890,
      tag_name: 'Sports',
      num_posts: 8,
    },
    {
      date: '2023-07-03',
      id: 54321,
      tag_name: 'Food',
      num_posts: 20,
    },
    {
      date: '2023-07-04',
      id: 98765,
      tag_name: 'Travel',
      num_posts: 12,
    },
    {
      date: '2023-07-05',
      id: 24680,
      tag_name: 'Fashion',
      num_posts: 5,
    },
  ];

  public categories=[
    {
      id: 1,
      category: "Category A",
      subCategories: [
        { id: 101, subCategory: "Subcategory A-1" },
        { id: 102, subCategory: "Subcategory A-2" },
        { id: 103, subCategory: "Subcategory A-3" }
      ]
    },
    {
      id: 2,
      category: "Category B",
      subCategories: [
        { id: 201, subCategory: "Subcategory B-1" },
        { id: 202, subCategory: "Subcategory B-2" },
        { id: 203, subCategory: "Subcategory B-3" }
      ]
    },
    {
      id: 3,
      category: "Category C",
      subCategories: [
        { id: 301, subCategory: "Subcategory C-1" },
        { id: 302, subCategory: "Subcategory C-2" },
        { id: 303, subCategory: "Subcategory C-3" }
      ]
    },
    {
      id: 4,
      category: "Category D",
      subCategories: [
        { id: 401, subCategory: "Subcategory D-1" },
        { id: 402, subCategory: "Subcategory D-2" },
        { id: 403, subCategory: "Subcategory D-3" }
      ]
    },
    {
      id: 5,
      category: "Category E",
      subCategories: [
        { id: 501, subCategory: "Subcategory E-1" },
        { id: 502, subCategory: "Subcategory E-2" },
        { id: 503, subCategory: "Subcategory E-3" }
      ]
    },
    {
      id: 6,
      category: "Category F",
      subCategories: [
        { id: 601, subCategory: "Subcategory F-1" },
        { id: 602, subCategory: "Subcategory F-2" },
        { id: 603, subCategory: "Subcategory F-3" }
      ]
    },
    {
      id: 7,
      category: "Category G",
      subCategories: [
        { id: 701, subCategory: "Subcategory G-1" },
        { id: 702, subCategory: "Subcategory G-2" },
        { id: 703, subCategory: "Subcategory G-3" }
      ]
    },
    {
      id: 8,
      category: "Category H",
      subCategories: [
        { id: 801, subCategory: "Subcategory H-1" },
        { id: 802, subCategory: "Subcategory H-2" },
        { id: 803, subCategory: "Subcategory H-3" }
      ]
    },
    {
      id: 9,
      category: "Category I",
      subCategories: [
        { id: 901, subCategory: "Subcategory I-1" },
        { id: 902, subCategory: "Subcategory I-2" },
        { id: 903, subCategory: "Subcategory I-3" }
      ]
    },
    {
      id: 10,
      category: "Category J",
      subCategories: [
        { id: 1001, subCategory: "Subcategory J-1" },
        { id: 1002, subCategory: "Subcategory J-2" },
        { id: 1003, subCategory: "Subcategory J-3" }
      ]
    }
  ]
public tags=  [
  { id: 1, tag: "Tag 1" },
  { id: 2, tag: "Tag 2" },
  { id: 3, tag: "Tag 3" },
  { id: 4, tag: "Tag 4" },
  { id: 5, tag: "Tag 5" },
  { id: 6, tag: "Tag 6" },
  { id: 7, tag: "Tag 7" },
  { id: 8, tag: "Tag 8" },
  { id: 9, tag: "Tag 9" },
  { id: 10, tag: "Tag 10" }
]
}
