import type { PropsWithChildren } from "react";
import { createContext, useState, useEffect, useContext } from "react";
import DragSelect from "dragselect";

interface DSCallback {
  items: HTMLElement[];
  isDragging: boolean;
  event: MouseEvent | TouchEvent;
}

interface DragSelectProviderProps {
  settings?: ConstructorParameters<typeof DragSelect>[0];
}

const DragSelectContext = createContext<DragSelect | undefined>(undefined);

const DragSelectProvider = ({
  children,
  settings = {},
}: PropsWithChildren<DragSelectProviderProps>) => {
  const [ds, setDS] = useState<DragSelect>();

  useEffect(() => {
    setDS((prevState) => {
      if (prevState) return prevState;
      return new DragSelect({});
    });
    return () => {
      if (ds) {
        ds.stop();
        setDS(undefined);
      }
    };
  }, [ds]);

  useEffect(() => {
    ds?.setSettings(settings);
  }, [ds, settings]);

  return (
    <DragSelectContext.Provider value={ds}>
      {children}
    </DragSelectContext.Provider>
  );
};

const useDragSelect = () => {
  return useContext(DragSelectContext);
};

export { DragSelectProvider, useDragSelect };
export type { DSCallback };
