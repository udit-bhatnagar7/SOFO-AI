import { createContext, useContext, useState, ReactNode } from "react";

type BookingContextType = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const BookingContext = createContext<BookingContextType>({
  open: false,
  openModal: () => {},
  closeModal: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <BookingContext.Provider
      value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
