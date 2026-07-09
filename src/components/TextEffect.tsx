import React, { memo } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface TextEffectProps {
  children: string;
  per?: 'char' | 'word' | 'line';
  as?: 'p' | 'h1' | 'span' | 'div';
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  delay?: number;
  trigger?: boolean;
}

interface AnimationComponentProps {
  segment: string;
  variants: Variants;
  per: 'char' | 'word' | 'line';
}

const AnimationComponent = memo(({ segment, variants, per }: AnimationComponentProps) => {
  if (per === 'line') {
    return (
      <motion.span variants={variants} className="block">
        {segment}
      </motion.span>
    );
  } else if (per === 'word') {
    return (
      <motion.span aria-hidden="true" variants={variants} className="inline-block whitespace-pre">
        {segment}
      </motion.span>
    );
  } else {
    return (
      <span className="inline-block whitespace-pre">
        {segment.split('').map((char, i) => (
          <motion.span
            key={`char-${i}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  }
});

AnimationComponent.displayName = 'AnimationComponent';

const defaultStaggerTimes = { char: 0.03, word: 0.05, line: 0.1 };

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants: customVariants,
  className,
  delay = 0,
  trigger = true,
}: TextEffectProps) {
  let segments: string[];
  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const containerVariants = customVariants?.container || defaultContainerVariants;
  const itemVariants = customVariants?.item || defaultItemVariants;
  const stagger = defaultStaggerTimes[per];

  const visibleVariant = containerVariants.visible as any;

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...visibleVariant,
      transition: {
        ...(visibleVariant?.transition || {}),
        staggerChildren: visibleVariant?.transition?.staggerChildren ?? stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  // Resolve the motion tag dynamically
  const MotionTag = (motion[as] || motion.p) as any;

  return (
    <AnimatePresence>
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={delayedContainerVariants}
          className={`whitespace-pre-wrap ${className || ''}`}
        >
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={itemVariants}
              per={per}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
