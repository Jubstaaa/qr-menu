# Tenant Dashboard

Admin dashboard for restaurant owners to manage their menus.

## Features

- **Menu Management**: Create and edit restaurant menus
- **Category Management**: Organize menu categories
- **Item Management**: Add, edit, and delete menu items
- **Drag & Drop**: Reorder categories and items
- **Image Upload**: Upload product and category images
- **Real-time Updates**: Live menu preview
- **Responsive Design**: Mobile and desktop optimized

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks + Context
- **Drag & Drop**: @dnd-kit/sortable
- **Forms**: React Hook Form with Zod
- **Authentication**: Supabase Auth
- **File Upload**: Supabase Storage

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Backend API running
- Supabase project

### Installation

```bash
cd apps/tenant-dashboard
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── cards/             # Dashboard cards
│   ├── dnd/               # Drag & drop components
│   ├── forms/             # Form components
│   └── modals/            # Modal components
├── hooks/                  # Custom hooks
└── providers/              # App providers
```

## Pages

### Authentication

- **Login** (`/auth/login`): User authentication
- **Dashboard** (`/dashboard`): Main dashboard overview
- **Menu Management** (`/dashboard/menu`): Menu editing interface

## Components

### Dashboard Components

- **DashboardNav**: Navigation sidebar
- **CategoryCard**: Category display and editing
- **ItemCard**: Menu item display and editing

### Drag & Drop

- **SortableCategories**: Draggable category list
- **SortableItems**: Draggable item list
- **SortableCategory**: Individual draggable category
- **SortableItem**: Individual draggable item

### Forms

- **CategoryForm**: Create/edit category form
- **ItemForm**: Create/edit item form
- **CreateCategoryForm**: New category creation
- **CreateItemForm**: New item creation

### Modals

- **DeleteConfirmModal**: Confirmation dialogs

## Features

### Menu Management

1. **Create Menu**: Set up restaurant information
2. **Add Categories**: Organize menu structure
3. **Add Items**: Populate menu with products
4. **Reorder**: Drag & drop to arrange items
5. **Edit**: Update menu content anytime

### Category Management

- **Create**: Add new menu categories
- **Edit**: Modify category details
- **Delete**: Remove unused categories
- **Reorder**: Arrange category sequence
- **Images**: Upload category images

### Item Management

- **Create**: Add new menu items
- **Edit**: Update item information
- **Delete**: Remove items
- **Images**: Upload product photos
- **Pricing**: Set item prices
- **Descriptions**: Add item details

## Data Flow

1. **Authentication**: User login via Supabase
2. **Data Fetching**: Load user's menu data
3. **Real-time Updates**: Live preview of changes
4. **API Sync**: Save changes to backend
5. **State Management**: React state updates

## API Integration

### Endpoints Used

- `GET /api/auth/check` - Verify authentication
- `GET /api/admin/menu` - Get user's menu
- `POST /api/admin/category` - Create category
- `PUT /api/admin/category/:id` - Update category
- `DELETE /api/admin/category/:id` - Delete category
- `POST /api/admin/item` - Create item
- `PUT /api/admin/item/:id` - Update item
- `DELETE /api/admin/item/:id` - Delete item

### Data Fetching

```typescript
// Custom hooks for API calls
const { data: categories, isLoading } = useCategories();
const { mutate: createCategory } = useCreateCategory();
const { mutate: updateCategory } = useUpdateCategory();
```

## Drag & Drop

### Implementation

Using `@dnd-kit/sortable` for smooth drag & drop:

```typescript
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={categories} strategy={verticalListSortingStrategy}>
    {categories.map(category => (
      <SortableCategory key={category.id} category={category} />
    ))}
  </SortableContext>
</DndContext>
```

### Features

- **Visual Feedback**: Drag preview and drop indicators
- **Smooth Animation**: CSS transitions for reordering
- **Touch Support**: Mobile drag & drop
- **Keyboard Navigation**: Accessibility support

## Forms

### Form Validation

Using Zod schemas from shared packages:

```typescript
import { categorySchema } from "@qr-menu/shared-validation";

const form = useForm({
  resolver: zodResolver(categorySchema),
  defaultValues: {
    name: "",
    description: "",
  },
});
```

### Form Features

- **Real-time Validation**: Instant feedback
- **Error Handling**: Clear error messages
- **Auto-save**: Automatic form persistence
- **Image Upload**: Drag & drop file uploads

## State Management

### React Hooks

- **useAuth**: Authentication state
- **useCategories**: Category data management
- **useItems**: Item data management
- **useMenuManagement**: Menu operations

### Context Providers

- **QueryProvider**: React Query for server state
- **AuthProvider**: Authentication context

## Styling

### Design System

- **Color Palette**: Professional dashboard colors
- **Typography**: Clear hierarchy for readability
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI patterns

### Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Performance

### Optimization

- **React Query**: Efficient data fetching and caching
- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component lazy loading

### Best Practices

- **Memoization**: React.memo for expensive components
- **Debouncing**: Form input debouncing
- **Optimistic Updates**: Immediate UI feedback
- **Error Boundaries**: Graceful error handling

## Security

### Authentication

- **JWT Tokens**: Secure authentication
- **Route Protection**: Protected dashboard routes
- **User Isolation**: Users can only access their data
- **Session Management**: Secure session handling

### Data Validation

- **Input Sanitization**: Prevent malicious input
- **Schema Validation**: Zod validation on all inputs
- **API Security**: Backend validation
- **File Upload**: Secure file handling

## Testing

### Component Testing

```bash
# Run component tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### E2E Testing

```bash
# Run Playwright tests
pnpm test:e2e
```

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository
2. Set environment variables
3. Configure build settings
4. Deploy automatically

### Environment Setup

Production environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## Monitoring

### Analytics

- **User Actions**: Track dashboard usage
- **Performance**: Monitor page load times
- **Errors**: Track application errors
- **User Flow**: Understand user behavior

### Error Tracking

- **Frontend Errors**: JavaScript errors
- **API Errors**: Backend connectivity issues
- **Validation Errors**: Form validation failures

## Contributing

1. Follow the existing component structure
2. Use TypeScript for all new code
3. Implement proper error handling
4. Add comprehensive testing
5. Update documentation

## License

MIT License - see main project README for details.
