import { motion } from 'framer-motion';

type ActivationPanelStackProps<T extends { id: string }> = {
  items: T[];
  activeId: string;
  renderPanel: (item: T) => React.ReactNode;
};

/**
 * Stacks all panels in one grid cell so container height stays at the
 * tallest panel — no layout jump when switching tabs with uneven content.
 */
const ActivationPanelStack = <T extends { id: string }>({
  items,
  activeId,
  renderPanel,
}: ActivationPanelStackProps<T>) => (
  <div className="grid [&>*]:col-start-1 [&>*]:row-start-1">
    {items.map((item) => {
      const isActive = activeId === item.id;

      return (
        <motion.div
          key={item.id}
          role="tabpanel"
          id={`activation-panel-${item.id}`}
          aria-hidden={!isActive}
          tabIndex={isActive ? 0 : -1}
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 8,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={isActive ? 'relative z-10' : 'pointer-events-none invisible'}
        >
          {renderPanel(item)}
        </motion.div>
      );
    })}
  </div>
);

export default ActivationPanelStack;
