const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Checklist API',
      version: '1.0.0',
      description: 'Checklist API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Local server',
      },
    ],
    components: {
      schemas: {
        IPAddress: {
          type: 'object',
          required: ['ip_address_id', 'ip_address'],
          properties: {
            ip_address_id: {
              type: 'integer',
              description: 'The ID of the IP address entry',
              example: 1,
            },
            ip_address: {
              type: 'string',
              description: 'The IP address in string format',
              example: '192.168.1.1',
            },
          },
        },
        Category: {
          type: 'object',
          required: ['category_id', 'name', 'duration'],
          properties: {
            category_id: {
              type: 'integer',
              description: 'The ID of the category',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'The name of the category',
              example: 'Weekly',
            },
            duration: {
              type: 'integer',
              description: 'The duration associated with the category',
              example: 30,
            },
            templates: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Template',
              },
              description: 'List of templates associated with the category',
            },
          },
        },
        BlackListedToken: {
          type: 'object',
          required: ['token_id', 'token', 'expires_at'],
          properties: {
            token_id: {
              type: 'string',
              format: 'uuid',
              description: 'The ID of the blacklisted token',
              example: 'e2b5b8e1-3f83-4b2a-9d8b-f10c6c8b1f5d',
            },
            token: {
              type: 'string',
              description: 'The blacklisted token',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            expires_at: {
              type: 'string',
              format: 'date-time',
              description: 'The expiration date of the token',
              example: '2024-08-31T12:00:00Z',
            },
          },
        },
        User: {
          type: 'object',
          required: ['user_id', 'user_name', 'hashed_password', 'role'],
          properties: {
            user_id: {
              type: 'integer',
              description: 'The ID of the user',
              example: 1,
            },
            user_name: {
              type: 'string',
              description: 'The username of the user',
              example: 'john_doe',
            },
            hashed_password: {
              type: 'string',
              description: 'The hashed password of the user',
              example: '$2b$10$...cI',
            },
            role: {
              type: 'string',
              description: 'The role of the user',
              example: 'admin',
            },
          },
        },
        Checklist: {
          type: 'object',
          required: ['checklist_id', 'due_date', 'template_id', 'site_id'],
          properties: {
            checklist_id: {
              type: 'integer',
              description: 'The ID of the checklist',
              example: 1,
            },
            due_date: {
              type: 'string',
              format: 'date-time',
              description: 'The due date of the checklist',
              example: '2024-08-31T12:00:00Z',
            },
            template_id: {
              type: 'integer',
              description:
                'The ID of the template associated with the checklist',
              example: 1,
            },
            site_id: {
              type: 'integer',
              description: 'The ID of the site associated with the checklist',
              example: 1,
            },
            user_checks: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/UserCheck',
              },
              description: 'List of user checks associated with the checklist',
            },
          },
        },
        Comment: {
          type: 'object',
          required: ['comment_id', 'content', 'user_check_id'],
          properties: {
            comment_id: {
              type: 'integer',
              description: 'The ID of the comment',
              example: 1,
            },
            content: {
              type: 'string',
              description: 'The content of the comment',
              example: 'This is a comment.',
            },
            user_check_id: {
              type: 'integer',
              description:
                'The ID of the user check associated with the comment',
              example: 1,
            },
          },
        },
        ListItem: {
          type: 'object',
          required: [
            'listitem_id',
            'keyword',
            'last_updated_by',
            'template_id',
          ],
          properties: {
            listitem_id: {
              type: 'integer',
              description: 'The ID of the list item',
              example: 1,
            },
            keyword: {
              type: 'string',
              description: 'The keyword of the list item',
              example: 'Safety',
            },
            description: {
              type: 'string',
              description: 'The description of the list item',
              example: 'Safety equipment required.',
            },
            is_environment_related: {
              type: 'boolean',
              description: 'Whether the list item is environment related',
              example: true,
            },
            last_updated_by: {
              type: 'string',
              description: 'The user who last updated the list item',
              example: 'admin',
            },
            template_id: {
              type: 'integer',
              description:
                'The ID of the template associated with the list item',
              example: 1,
            },
            sites: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Site',
              },
              description: 'List of sites associated with the list item',
            },
          },
        },
        ListItemSite: {
          type: 'object',
          required: ['listitem_site_id'],
          properties: {
            listitem_site_id: {
              type: 'integer',
              description: 'The ID of the list item site association',
              example: 1,
            },
          },
        },
        Site: {
          type: 'object',
          required: ['site_id', 'site_name'],
          properties: {
            site_id: {
              type: 'integer',
              description: 'The ID of the site',
              example: 1,
            },
            site_name: {
              type: 'string',
              description: 'The name of the site',
              example: 'Site A',
            },
            region: {
              type: 'string',
              description: 'The region of the site',
              example: 'North',
            },
            templates: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Template',
              },
              description: 'List of templates associated with the site',
            },
            list_items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ListItem',
              },
              description: 'List of list items associated with the site',
            },
          },
        },
        Template: {
          type: 'object',
          required: ['template_id', 'title', 'status'],
          properties: {
            template_id: {
              type: 'integer',
              description: 'The ID of the template',
              example: 1,
            },
            title: {
              type: 'string',
              description: 'The title of the template',
              example: 'Safety Checklist',
            },
            description: {
              type: 'string',
              description: 'The description of the template',
              example: 'Checklist for safety inspections.',
            },
            status: {
              type: 'string',
              enum: ['published', 'archived', 'draft'],
              description: 'The status of the template',
              example: 'draft',
            },
            last_updated_by: {
              type: 'string',
              description: 'The user who last updated the template',
              example: 'admin',
            },
            category_id: {
              type: 'integer',
              description:
                'The ID of the category associated with the template',
              example: 1,
            },
            checklists: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Checklist',
              },
              description: 'List of checklists associated with the template',
            },
            list_items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ListItem',
              },
              description: 'List of list items associated with the template',
            },
            sites: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Site',
              },
              description: 'List of sites associated with the template',
            },
          },
        },
        TemplateSite: {
          type: 'object',
          required: ['template_site_id'],
          properties: {
            template_site_id: {
              type: 'integer',
              description: 'The ID of the template site association',
              example: 1,
            },
          },
        },
        UserCheck: {
          type: 'object',
          required: ['user_check_id', 'is_checked'],
          properties: {
            user_check_id: {
              type: 'integer',
              description: 'The ID of the user check',
              example: 1,
            },
            is_checked: {
              type: 'boolean',
              description: 'Indicates if the item was checked',
              example: true,
            },
            listitem_id: {
              type: 'integer',
              description:
                'The ID of the list item associated with the user check',
              example: 1,
            },
            checklist_id: {
              type: 'integer',
              description:
                'The ID of the checklist associated with the user check',
              example: 1,
            },
            comments: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Comment',
              },
              description: 'List of comments associated with the user check',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to your API files
}

module.exports = swaggerOptions
