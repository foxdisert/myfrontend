# Ezoic Ad Integration Guide

## ✅ Setup Complete

Your website has been successfully integrated with Ezoic ads. The following components are ready to use:

## 📦 Components

### EzoicAdPlacement Component

A reusable component for displaying Ezoic ads anywhere on your site.

**Location:** `client/src/components/EzoicAdPlacement.jsx`

## 🎯 Usage Examples

### Single Ad Placement

```jsx
import EzoicAdPlacement from '../components/EzoicAdPlacement'

// Single placement
<EzoicAdPlacement placementId={101} />
```

### Multiple Ad Placements (Optimized)

For pages with multiple placements, pass all IDs in a single call for better performance:

```jsx
// Multiple placements - more efficient
<EzoicAdPlacement placementIds={[101, 102, 103]} />
```

### With Custom Styling

```jsx
<EzoicAdPlacement 
  placementId={101} 
  className="my-custom-class" 
/>
```

**Important:** Do NOT add inline styles or min-height to the placeholder div. Ezoic will handle sizing automatically.

## 📍 Current Ad Placements

### Home Page
- **Top Banner:** Placement ID `101` (replace with your actual ID from Ezoic dashboard)
  - Location: After hero section, before stats
  - File: `client/src/pages/Home.jsx`

## 🔧 Next Steps

1. **Get Your Placement IDs:**
   - Log into your Ezoic dashboard
   - Create ad placements
   - Note down the placement IDs

2. **Update Placement IDs:**
   - Replace `101` in `Home.jsx` with your actual placement ID
   - Add more placements as needed

3. **Add More Ad Locations:**
   - Import `EzoicAdPlacement` in any component
   - Add `<EzoicAdPlacement placementId={YOUR_ID} />` where you want ads

## 📝 Best Practices

- ✅ Use `placementIds` array for multiple placements on the same page
- ✅ Place ads in natural content breaks
- ✅ Don't add styling to placeholder divs
- ✅ Test ad visibility on mobile devices
- ✅ Follow Ezoic's placement guidelines

## 🚫 Removed Code

- AdSense script has been removed from `index.html`
- Old `AdBanner` component replaced with `EzoicAdPlacement`
- Ezoic scripts are now in the `<head>` section

## 📚 Ezoic Resources

- [Ezoic Dashboard](https://ezoic.com)
- [Ezoic Support](https://support.ezoic.com)
- [Placement Best Practices](https://support.ezoic.com)

