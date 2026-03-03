# Verification Checklist

## 1. UI & Design
- [ ] **Home Page**: Verify blue gradient background (`#0066FF` -> `#00D4FF`) appears on hero sections.
- [ ] **Cards**: Verify cards have glassmorphism effect (blur + transparency) and lift on hover.
- [ ] **Animations**: Check that ImageSlider fades smoothly between slides.
- [ ] **Dark Mode**: Toggle dark mode and verify text/background contrast remains accessible.

## 2. Navigation & Routing
- [ ] **Links**: Click "Services" in nav -> Should go to `/services`.
- [ ] **Slugs**: Click a service card -> Should go to `/services/laser-hair-removal-delhi-ncr`.
- [ ] **Redirects**: Manually visit `/laser-hair-removal` -> Should redirect to `/laser-hair-removal-delhi-ncr`.
- [ ] **Footer**: Verify footer links use new `-delhi-ncr` slugs.

## 3. Image System
- [ ] **Upload**: Go to Admin -> Gallery. Upload a new image.
- [ ] **Persistence**: Refresh the admin page. Image should still be there.
- [ ] **Frontend**: Go to Home Page. The new gallery image should appear in "Real Patient Results".

## 4. Admin Functionality
- [ ] **Services**: Edit a service title in Admin -> Services. Verify change on Home Page.
- [ ] **CoolSculpting**: Add a new Before/After pair. Verify it appears on CoolSculpting page.