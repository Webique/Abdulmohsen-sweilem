import { motion, Variants, Transition } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

// Custom easing curve (cubic-bezier)
const customEase: [number, number, number, number] = [0.33, 1, 0.68, 1];

// Page transition variants
const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
    },
};

const pageTransition: Transition = {
    duration: 0.5,
    ease: customEase,
};

const PageTransition = ({ children }: PageTransitionProps) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
            className="min-h-screen"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
