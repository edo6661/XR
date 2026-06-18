import { motion } from 'framer-motion';

type ActivationPanelStackProps<T extends { id: string }> = {
  items: T[];
  activeId: string;
  renderPanel: (item: T) => React.ReactNode;
};

/**
 * Tab panels with cross-fade. Only the active panel contributes to layout
 * height so mobile does not reserve space for every inactive experience.
 */
const ActivationPanelStack = <T extends { id: string }>({
  items,
  activeId,
  renderPanel,
}: ActivationPanelStackProps<T>) => (
  <div className="relative">
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
          className={
            isActive
              ? 'relative z-10'
              : 'pointer-events-none absolute inset-x-0 top-0 h-0 overflow-hidden opacity-0 invisible'
          }
        >
          {renderPanel(item)}
        </motion.div>
      );
    })}
  </div>
);

export default ActivationPanelStack;
