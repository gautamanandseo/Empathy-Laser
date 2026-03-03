// Placeholder images from Unsplash used to demonstrate the gallery structure.
// In production, replace these URLs with actual patient photos.

export const galleryData = [
  {
    id: 'abdomen',
    title: 'Abdomen',
    pairs: [
      {
        id: 'abs-1',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        label: 'Abdomen Result 1'
      },
      {
        id: 'abs-2',
        before: 'https://images.unsplash.com/photo-1583966832159-9baaa6c1cdcc?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        label: 'Abdomen Result 2'
      },
      {
        id: 'abs-3',
        before: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1583966832159-9baaa6c1cdcc?auto=format&fit=crop&q=80&w=600',
        label: 'Abdomen Result 3'
      }
    ]
  },
  {
    id: 'thigh',
    title: 'Thighs',
    pairs: [
      {
        id: 'thigh-1',
        before: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1655655367617-ffe4910a34a9?auto=format&fit=crop&q=80&w=600',
        label: 'Inner Thighs'
      },
      {
        id: 'thigh-2',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        label: 'Outer Thighs'
      }
    ]
  },
  {
    id: 'bra_fat',
    title: 'Back / Bra Fat',
    pairs: [
      {
        id: 'back-1',
        before: 'https://images.unsplash.com/photo-1632940267251-43e08c453c9c?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        label: 'Bra Line Reduction'
      },
      {
        id: 'back-2',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1632940267251-43e08c453c9c?auto=format&fit=crop&q=80&w=600',
        label: 'Back Smoothing'
      }
    ]
  },
  {
    id: 'double_chin',
    title: 'Double Chin',
    pairs: [
      {
        id: 'chin-1',
        before: 'https://images.unsplash.com/photo-1664958884838-705b1518406f?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        label: 'Chin Profile'
      },
      {
        id: 'chin-2',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1664958884838-705b1518406f?auto=format&fit=crop&q=80&w=600',
        label: 'Jawline Definition'
      }
    ]
  },
  {
    id: 'flanks',
    title: 'Flanks / Love Handles',
    pairs: [
      {
        id: 'flank-1',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        label: 'Love Handles'
      },
      {
        id: 'flank-2',
        before: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        label: 'Side Sculpting'
      }
    ]
  },
  {
    id: 'upper_arms',
    title: 'Upper Arms',
    pairs: [
      {
        id: 'arm-1',
        before: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        label: 'Upper Arms'
      },
      {
        id: 'arm-2',
        before: 'https://images.unsplash.com/photo-1691935152212-596d5ee37383?auto=format&fit=crop&q=80&w=600',
        after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=600',
        label: 'Arm Toning'
      }
    ]
  }
];

export const hotspots = [
  // Male
  { id: 'double_chin', x: 23, y: 19, label: 'Double Chin' }, // male chin
  { id: 'flanks', x: 20, y: 55, label: 'Flanks' }, // male flank
  { id: 'abdomen', x: 28, y: 50, label: 'Abdomen' }, // male abs

  // Female
  { id: 'upper_arms', x: 92, y: 32, label: 'Upper Arms' }, // female arm
  { id: 'bra_fat', x: 74, y: 38, label: 'Bra Fat' }, // female bra/back
  { id: 'flanks', x: 80, y: 56, label: 'Flanks' }, // female flank
  { id: 'thigh', x: 72, y: 68, label: 'Thighs' }, // female thigh inner
  { id: 'thigh', x: 86, y: 72, label: 'Thighs' }, // female thigh outer
];