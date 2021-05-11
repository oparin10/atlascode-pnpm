import { DashboardItem } from "@hefesto/types";

const cardCollection: DashboardItem = {
  showID: true,
  collectionRef: "courses",
  itemID: "courses_id",
  itemCategory: "creation",
  sidebarIcon: "CardTravel",
  routerPath: "cursos",
  sidebarLabel: "Cursos",
  hasAttributes: false,
  hasCategories: false,
  fieldGroups: [{ id: "infoGroup", label: "Informações" }],
  fields: [
    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Nome do curso",
      name: "courseName",
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Duração do curso",
      name: "courseDuration",
    },

    {
      groupID: "infoGroup",
      fieldType: "select",
      selectOptions: ["Graduação", "Pós-graduação", "Extensão"],
      label: "Nível do curso",
      name: "courseLevel",
    },

    {
      groupID: "infoGroup",
      fieldType: "list",
      label: "Matriz curricular",
      name: "courseSyllabus",
      hidden: true,
      listOptions: {
        fieldLabel: "Nome da máteria",
        label: "Matriz curricular",
      },
    },

    {
      groupID: "infoGroup",
      fieldType: "text",
      label: "Descrição do curso",
      name: "courseDescription",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Área do curso",
      name: "courseArea",
    },

    {
      groupID: "infoGroup",
      fieldType: "image",
      label: "Foto para página do curso",
      name: "courseImage",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "image",
      label: "Foto do certificado de E-MEC",
      name: "courseEmecPicture",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Link para página de certificado de E-MEC",
      name: "courseEmecURL",
      hidden: true,
    },
  ],
};

const blogCollection: DashboardItem = {
  collectionRef: "portalBlog",
  sidebarIcon: "LibraryBooks",
  routerPath: "blog",
  sidebarLabel: "Blog",
  itemCategory: "creation",
  itemID: "blogPortal",
  fieldGroups: [{ id: "blogInfo", label: "Informações" }],
  fields: [
    {
      groupID: "blogInfo",
      fieldType: "string",
      label: "Título",
      name: "blogTitle",
      slug: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "text",
      label: "Descrição do post",
      name: "blogDescription",
      hidden: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "image",
      label: "Imagem principal",
      name: "featuredImage",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "markdown",
      label: "Texto",
      name: "blogPost",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "boolean",
      label: "Status do post",
      name: "blogActive",
      hidden: true,
    },
  ],
};

const testimonialCollection: DashboardItem = {
  showID: true,
  collectionRef: "testimonials",
  itemCategory: "creation",
  itemID: "portalTestimonials",
  routerPath: "depoimentos",
  sidebarLabel: "Depoimento",
  sidebarIcon: "Group",
  fieldGroups: [{ id: "infoTestimonial", label: "Informações" }],
  fields: [
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Nome do cliente",
      name: "testimonialName",
      slug: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "image",
      label: "Foto do cliente",
      name: "testimonialPicture",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "text",
      label: "Depoimento do cliente",
      name: "testimonialText",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Cidade/Estado",
      name: "testimonialLocation",
      hidden: true,
    },
  ],
};

const partnersCollection: DashboardItem = {
  collectionRef: "partners",
  itemCategory: "creation",
  itemID: "partnerID",
  routerPath: "parceiros",
  sidebarIcon: "MoreHoriz",
  sidebarLabel: "Parceiro",
  fieldGroups: [{ id: "partnerInfo", label: "Informações" }],
  fields: [
    {
      fieldType: "string",
      label: "Nome do parceiro",
      name: "partnerName",
      groupID: "partnerInfo",
    },
    {
      fieldType: "image",
      label: "Logo do parceiro",
      name: "partnerLogo",
      groupID: "partnerInfo",
      hidden: true,
    },
    {
      fieldType: "list",
      label: "Lista",
      name: "simpleList",
      groupID: "partnerInfo",
      listOptions: {
        fieldLabel: "Nome do ingrediente",
        label: "Lista de ingredientes",
      },
      hidden: true,
    },
    {
      fieldType: "installment",
      label: "Another list",
      name: "installmentList",
      groupID: "partnerInfo",
      listOptions: {
        fieldLabel: "Saldo",
        label: "notused",
      },
      hidden: true,
    },
  ],
};

export const collections: Array<DashboardItem> = [
  cardCollection,
  blogCollection,
  testimonialCollection,
  partnersCollection,
];
