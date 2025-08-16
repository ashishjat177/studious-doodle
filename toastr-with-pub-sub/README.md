# Toastr with Pub/Sub Pattern

A React-based toast notification system implementing the Publisher/Subscriber pattern for managing notifications.

## Features

- Multiple toast types: success, error, warning, and info
- Configurable toast duration
- Queue system for managing multiple toasts
- Position configuration (top-right, etc.)
- Maximum toast limit with queuing system
- Smooth animations (via CSS)

## Installation

```bash
npm install
# or
yarn install
```

## Usage

### Basic Implementation

```jsx
import { toastr } from './constant'

// Show different types of toasts
toastr.success('Operation successful!', 3000)
toastr.error('Something went wrong!', 3000)
toastr.warning('Warning message', 3000)
toastr.info('Information message', 3000)
```

### Configuration

The toast system can be configured in `ToastrContainer.jsx`:

```jsx
const config = {
    position: "top-right",  // Position of toast stack
    duration: 3000,         // Default duration in milliseconds
    maxToasts: 5,          // Maximum number of toasts in queue
    maxLimit: 3,           // Maximum visible toasts at once
}
```

### Components

1. **ToastrContainer**: Main component that manages toast state and queue
2. **Toastr**: Individual toast component
3. **PubSub**: Publisher/Subscriber implementation for toast events

### Features Explanation

- **Queue System**: When maximum visible toasts limit is reached, new toasts are queued
- **Auto Dismiss**: Toasts automatically dismiss after the specified duration
- **Manual Dismiss**: Users can manually close toasts
- **Dynamic Updates**: Queue automatically processes next toast when one is dismissed

## Project Structure

```
toastr-with-pub-sub/
├── src/
│   ├── components/
│   │   ├── Toastr.jsx
│   │   └── ToastrContainer.jsx
│   ├── constant.js
│   ├── pubsub.js
│   ├── App.jsx
│   └── main.jsx
```

## CSS Customization

Add your custom styles in your CSS file:

```css
.toastr-container {
    position: fixed;
    z-index: 1000;
}

.toastr-container.top-right {
    top: 1rem;
    right: 1rem;
}

.toastr {
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    min-width: 200px;
}

.toastr.success { background-color: #4caf50; }
.toastr.error { background-color: #f44336; }
.toastr.warning { background-color: #ff9800; }
.toastr.info { background-color: #2196f3; }
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
