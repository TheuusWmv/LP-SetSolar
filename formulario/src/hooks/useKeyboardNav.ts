import { useEffect } from 'react';

interface KeyboardNavOptions {
  onSelectOption?: (index: number) => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  enabled?: boolean;
}

export function useKeyboardNav({
  onSelectOption,
  onEnter,
  onEscape,
  onArrowLeft,
  onArrowRight,
  enabled = true,
}: KeyboardNavOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement instanceof HTMLSelectElement;

      // Escape always works
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape?.();
        return;
      }

      // Inputs handle their own Enter key; buttons keep native keyboard behavior.
      if (event.key === 'Enter') {
        if (isInputFocused || activeElement instanceof HTMLButtonElement) return;
        event.preventDefault();
        onEnter?.();
        return;
      }

      // When the user is typing inside an input field, do NOT intercept letters or arrows
      if (isInputFocused) {
        return;
      }

      // Options hotkeys: A, B, C, D, E
      const keyUpper = event.key.toUpperCase();
      const shortcutMap: Record<string, number> = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
      };

      if (shortcutMap[keyUpper] !== undefined && onSelectOption) {
        event.preventDefault();
        onSelectOption(shortcutMap[keyUpper]);
        return;
      }

      // Arrows for slider or navigation
      if (event.key === 'ArrowLeft' && onArrowLeft) {
        event.preventDefault();
        onArrowLeft();
      } else if (event.key === 'ArrowRight' && onArrowRight) {
        event.preventDefault();
        onArrowRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, onSelectOption, onEnter, onEscape, onArrowLeft, onArrowRight]);
}
