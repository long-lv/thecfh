# Storybook Implementation for Common Components

This document provides an overview of the Storybook implementation for all common components in the project.

## 📚 Components with Storybook Stories

### 1. ThecfhButton
**File:** `src/components/thecfhButton/ThecfhButton.stories.ts`
- **Stories:** Default, Primary, Secondary, Disabled, CustomSize, Small, Large, WithCustomStyle
- **Features:** Button with various styles, sizes, and states
- **Controls:** label, width, height, className, disabled, onClick

### 2. ThecfhInput
**File:** `src/components/thecfhInput/ThecfhInput.stories.ts`
- **Stories:** Default, WithValue, Password, Number, Disabled, CustomWidth, SmallWidth, LargeWidth, WithCustomStyle
- **Features:** Input field with different types and configurations
- **Controls:** placeholder, value, type, width, disabled, onChange, onKeyDown, onKeyUp

### 3. ThecfhSelect
**File:** `src/components/thecfhSelect/ThecfhSelect.stories.ts`
- **Stories:** Default, WithValue, Small, Medium, Disabled, CustomSize, ManyOptions, WithCustomStyle, EmptyOptions
- **Features:** Dropdown select with Material-UI integration
- **Controls:** value, label, width, height, disabled, size, onChange

### 4. ThecfhTable
**File:** `src/components/thecfhTable/ThecfhTable.stories.ts`
- **Stories:** Default, WithSelection, Loading, Empty, Dense, Striped, WithoutHover, CustomHeight, WithCustomStyle, LargeDataset
- **Features:** Comprehensive table with sorting, selection, and various display options
- **Controls:** loading, emptyMessage, stickyHeader, maxHeight, selectable, dense, striped, hover, border

### 5. ThecfhCheckbox
**File:** `src/components/thecfhCheckbox/ThecfhCheckbox.stories.ts`
- **Stories:** Default, Checked, Disabled, DisabledChecked, Small, Medium, WithCustomStyle, WithCustomClassName
- **Features:** Checkbox with Material-UI integration
- **Controls:** value, disabled, size, onChange

### 6. ThecfhDialog
**File:** `src/components/thecfhDialog/ThecfhDialog.stories.ts`
- **Stories:** Default, WithTitle, WithActions, Small, Large, FullWidth, WithLoading, DisableBackdropClick, CustomWidth, WithoutCloseButton, ComplexContent
- **Features:** Modal dialog with various configurations
- **Controls:** open, title, maxWidth, fullWidth, fullScreen, disableBackdropClick, closeButton, confirmButton, loading

### 7. ThecfhCalendar
**File:** `src/components/thecfhCalender/ThecfhCalender.stories.ts`
- **Stories:** Default, SingleDate, DateRange, Disabled, WithMinDate, WithMaxDate, WithDateRange, CustomWidth, RangeWithLimits, WithCustomStyle
- **Features:** Calendar for single date or date range selection
- **Controls:** mode, width, disabled, minDate, maxDate, onChange, onRangeChange

### 8. ThecfhPaginator
**File:** `src/components/thecfhPaginator/ThecfhPaginator.stories.ts`
- **Stories:** Default, FirstPage, MiddlePage, LastPage, SmallDataset, LargeDataset, WithoutFirstLastButtons, WithoutRowsPerPage, Disabled, Small, CustomRowsPerPageOptions, WithCustomStyle, EmptyDataset
- **Features:** Pagination component with page navigation and rows per page selection
- **Controls:** page, rowsPerPage, totalRows, showFirstButton, showLastButton, showRowsPerPage, disabled, size

### 9. ThecfhTooltip
**File:** `src/components/thecfhTolltip/ThecfhTooltip.stories.ts`
- **Stories:** Default, LongText, Button, Icon, CustomStyled, WithCustomStyle, WithCustomClassName, ComplexContent, Link
- **Features:** Tooltip component with Material-UI integration
- **Controls:** title, description, className, style

## 🚀 Running Storybook

To run Storybook and view all the component stories:

```bash
npm run storybook
```

This will start the Storybook development server on `http://localhost:6006`.

## 📖 Story Features

Each component story includes:

- **Interactive Controls:** All props are controllable through Storybook's controls panel
- **Actions:** Event handlers are logged in the Actions panel
- **Documentation:** Auto-generated documentation for each component
- **Accessibility:** Built-in accessibility testing with the a11y addon
- **Responsive Design:** Stories work across different screen sizes
- **State Management:** Complex components include state management wrappers

## 🎨 Story Variants

Each component includes multiple story variants to demonstrate:

- **Default states** - Basic component usage
- **Different sizes** - Small, medium, large variations
- **Different states** - Enabled, disabled, loading, etc.
- **Custom styling** - Examples with custom CSS and styles
- **Edge cases** - Empty states, error states, etc.
- **Real-world usage** - Complex examples with realistic data

## 🔧 Configuration

The Storybook configuration includes:

- **Framework:** Next.js with Vite
- **Addons:** Docs, A11y, Onboarding, Vitest
- **Static Assets:** Public folder for images and fonts
- **TypeScript:** Full TypeScript support
- **CSS Modules:** Support for CSS modules

## 📝 Usage

Each story file follows the standard Storybook format:

1. **Meta Configuration:** Defines the component, title, and parameters
2. **ArgTypes:** Defines controls and documentation for each prop
3. **Stories:** Multiple story variants showcasing different use cases
4. **Actions:** Event handlers for interactive testing

## 🎯 Benefits

This Storybook implementation provides:

- **Component Documentation:** Visual documentation for all components
- **Interactive Testing:** Test components in isolation
- **Design System:** Consistent component usage across the project
- **Development Efficiency:** Faster component development and testing
- **Quality Assurance:** Visual regression testing capabilities
- **Team Collaboration:** Shared understanding of component behavior

## 🔄 Maintenance

To add new stories or modify existing ones:

1. Create or edit the `.stories.ts` file in the component directory
2. Follow the established patterns for meta configuration and story definitions
3. Test the stories in the Storybook interface
4. Update this documentation if needed

All stories are automatically discovered by Storybook based on the pattern `**/*.stories.@(js|jsx|mjs|ts|tsx)`.
