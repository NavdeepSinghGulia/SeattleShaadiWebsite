# Mobile Royal Animations 👑📱

A comprehensive mobile-first animation system that brings royal elegance to mobile devices with optimized performance, haptic feedback, and accessibility features.

## 🌟 Features

### Mobile-First Design
- **Responsive Animations**: Automatically adapts animation complexity based on device capabilities
- **Touch Optimizations**: Enhanced touch interactions with haptic feedback
- **Performance Scaling**: Dynamic particle counts and animation durations based on device performance
- **Screen Size Adaptations**: Different animation variants for small, medium, and large screens

### Royal Animation Types
- **Royal Float**: Elegant floating animations with subtle movements
- **Golden Pulse**: Majestic glow effects with customizable intensity
- **Crown Bounce**: Playful crown animations for special elements
- **Royal Entrance**: Sophisticated entrance animations with blur effects
- **Jewel Sparkle**: Sparkling particle effects optimized for mobile
- **Elegant Fade**: Smooth fade transitions with mobile considerations

### Accessibility & Performance
- **Reduced Motion Support**: Respects user's motion preferences
- **Device Performance Detection**: Automatically adjusts based on device capabilities
- **Battery Optimization**: Reduces animations on low-power devices
- **Haptic Feedback**: Native vibration support for enhanced interactions

## 🚀 Quick Start

### 1. Use the Mobile Royal Animations Hook

```tsx
import { useMobileRoyalAnimations } from '@/hooks/use-mobile-royal-animations';

function MyComponent() {
  const { 
    isMobile, 
    isTouch, 
    variants, 
    triggerHapticFeedback, 
    settings 
  } = useMobileRoyalAnimations();

  return (
    <motion.div
      variants={variants.mobileRoyalEntrance}
      initial="hidden"
      animate="visible"
      onTap={() => triggerHapticFeedback('medium')}
    >
      Royal Content
    </motion.div>
  );
}
```

### 2. Enhanced Components

All royal components now include mobile optimizations:

```tsx
// Interactive CTA Button with haptic feedback
<InteractiveCtaButton
  variant="royal"
  onClick={() => triggerHapticFeedback('heavy')}
>
  Royal Action
</InteractiveCtaButton>

// Luxury Card with touch interactions
<LuxuryCard 
  variant="royal" 
  hoverable 
  glowEffect
>
  Card Content
</LuxuryCard>

// Royal Typography with mobile-optimized animations
<RoyalTypography
  variant="h1"
  animation="crownTitle"
  glowOnHover
>
  Royal Heading
</RoyalTypography>
```

### 3. Complete Page Layout

```tsx
import { MobileRoyalPage } from '@/components/mobile-royal-page';

export default function MyPage() {
  return (
    <MobileRoyalPage>
      <YourContent />
    </MobileRoyalPage>
  );
}
```

## 📱 Mobile Optimizations

### Device Detection
The system automatically detects:
- Mobile vs Desktop devices
- Touch capability
- Screen size categories
- Device performance score
- Available memory

### Performance Scaling
Based on device capabilities:

| Device Type | Particles | Animation Duration | Glow Intensity | Complex Animations |
|-------------|-----------|-------------------|----------------|-------------------|
| Low-end Mobile | 4 | 0.6s | 30% | Disabled |
| Mid-range Mobile | 8 | 0.8s | 50% | Limited |
| High-end Mobile | 12 | 1.0s | 80% | Full |
| Desktop | 20 | 1.2s | 100% | Full |

### Touch Interactions
- **Haptic Feedback**: Light, medium, and heavy vibration patterns
- **Touch-Optimized Hover**: Replaces hover states with tap interactions
- **Gesture Recognition**: Supports tap, long press, and swipe gestures
- **Touch Target Sizing**: Ensures minimum 44px touch targets

## 🎨 Animation Variants

### Mobile Royal Entrance
```tsx
const mobileRoyalEntrance = {
  hidden: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    filter: 'blur(5px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: settings.animationDuration,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
```

### Mobile Hover States
```tsx
const mobileHover = {
  idle: { 
    scale: 1,
    boxShadow: `0 2px 8px rgba(184, 134, 11, ${settings.glowIntensity * 0.2})`
  },
  hover: { 
    scale: 1.02,
    boxShadow: `0 4px 15px rgba(184, 134, 11, ${settings.glowIntensity * 0.4})`,
    transition: {
      duration: settings.animationDuration * 0.5
    }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};
```

## 🔧 Configuration

### Animation Preferences
Users can customize their experience:

```tsx
const { shouldAnimate, intensity, getDuration } = useAnimation();

// Intensity levels: 'low', 'medium', 'high'
// shouldAnimate: respects prefers-reduced-motion
// getDuration: returns scaled duration based on preferences
```

### Device-Specific Settings
```tsx
const settings = {
  enableParticles: boolean,
  enableComplexAnimations: boolean,
  animationDuration: number,
  particleCount: number,
  glowIntensity: number,
  enableHapticFeedback: boolean
};
```

## 🎯 Best Practices

### Performance
1. **Use Conditional Rendering**: Only render particles when `settings.enableParticles` is true
2. **Respect Animation Preferences**: Check `settings.enableComplexAnimations` before complex effects
3. **Optimize Particle Counts**: Use `settings.particleCount` for dynamic particle rendering
4. **Scale Animation Durations**: Use `settings.animationDuration` for consistent timing

### Accessibility
1. **Respect Reduced Motion**: Always check animation preferences
2. **Provide Haptic Feedback**: Use `triggerHapticFeedback()` for touch interactions
3. **Ensure Touch Targets**: Minimum 44px for interactive elements
4. **Test on Real Devices**: Verify performance on various mobile devices

### User Experience
1. **Progressive Enhancement**: Start with basic animations, enhance based on capability
2. **Consistent Interactions**: Use the same haptic patterns throughout the app
3. **Visual Feedback**: Provide clear visual responses to user interactions
4. **Performance Monitoring**: Monitor frame rates and adjust accordingly

## 🧪 Testing

### Demo Page
Visit `/mobile-royal-demo` to experience all mobile royal animations in action.

### Device Testing
Test on various devices:
- iPhone (various models)
- Android phones (various manufacturers)
- Tablets (iPad, Android tablets)
- Different screen sizes and orientations

### Performance Metrics
Monitor:
- Frame rates during animations
- Memory usage with particles
- Battery impact
- Touch response times

## 🔮 Future Enhancements

### Planned Features
- **Gesture Recognition**: Swipe, pinch, and rotate gestures
- **Advanced Haptics**: More nuanced haptic patterns
- **AR Integration**: Royal animations in augmented reality
- **Voice Interactions**: Voice-triggered royal animations
- **Adaptive Theming**: Dynamic color adjustments based on ambient light

### Performance Improvements
- **WebGL Acceleration**: Hardware-accelerated particles
- **Service Worker Caching**: Cache animation assets
- **Lazy Loading**: Load animations on demand
- **Memory Optimization**: Better cleanup of animation resources

## 📚 API Reference

### useMobileRoyalAnimations Hook
```tsx
interface MobileRoyalAnimationsReturn {
  isMobile: boolean;
  isTouch: boolean;
  screenSize: { width: number; height: number };
  settings: MobileRoyalAnimationSettings;
  variants: Record<string, Variants>;
  triggerHapticFeedback: (type: 'light' | 'medium' | 'heavy') => void;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
}
```

### Animation Variants
- `mobileRoyalEntrance`: Entrance animation optimized for mobile
- `mobileHover`: Touch-friendly hover states
- `mobileParticle`: Particle animations with performance scaling
- `mobileTextReveal`: Text reveal animations for mobile
- `mobileCard`: Card animations with touch interactions

### Utility Functions
```tsx
// Trigger haptic feedback
triggerHapticFeedback('light' | 'medium' | 'heavy');

// Get optimal settings for device
getMobileOptimizedSettings(): MobileRoyalAnimationSettings;

// Calculate device performance score
calculateDeviceScore(): number; // 0-1
```

## 🤝 Contributing

When adding new mobile royal animations:

1. **Follow Mobile-First Approach**: Design for mobile, enhance for desktop
2. **Include Performance Scaling**: Provide different variants for different device capabilities
3. **Add Haptic Support**: Include haptic feedback for interactive elements
4. **Test Accessibility**: Ensure animations work with reduced motion preferences
5. **Document Usage**: Update this README with new animation patterns

## 📄 License

This mobile royal animation system is part of the royal wedding platform and follows the same licensing terms.

---

*Crafted with 👑 royal precision for the mobile-first world*

