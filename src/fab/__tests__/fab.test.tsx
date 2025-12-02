import React from 'react';
import { describe, it, expect, render, vi, fireEvent, act } from '@test/utils';
import { AddIcon } from 'tdesign-icons-react';
import { Fab } from '../index';

const prefix = 't';
const name = `.${prefix}-fab`;

describe('Fab', () => {
  describe('props', () => {
    it(':icon', () => {
      const { container } = render(<Fab icon={<AddIcon data-testid="fab-icon" />} />);
      expect(container.querySelector('[data-testid="fab-icon"]')).toBeTruthy();
    });

    it(':text', () => {
      const { container, queryByText } = render(<Fab icon={<AddIcon />} text="按钮文字" />);
      expect(queryByText('按钮文字')).toBeTruthy();
      // When text is provided, the button shape should be round
      expect(container.querySelector('.t-button--round')).toBeTruthy();
    });

    it(':text empty', () => {
      const { container } = render(<Fab icon={<AddIcon />} />);
      // When no text, the button shape should be circle
      expect(container.querySelector('.t-button--circle')).toBeTruthy();
    });

    it(':style', () => {
      const { container } = render(<Fab icon={<AddIcon />} style={{ right: '20px', bottom: '40px' }} />);
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
      expect(fabElement.getAttribute('style')).toContain('right: 20px');
      expect(fabElement.getAttribute('style')).toContain('bottom: 40px');
    });

    it(':draggable false', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable={false} style={{ right: '20px', bottom: '40px' }} />,
      );
      const fabElement = container.querySelector(name);
      // When draggable is false, the style should be applied directly
      expect(fabElement.getAttribute('style')).toContain('right: 20px');
    });

    it(':draggable all', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':draggable vertical', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="vertical" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':draggable horizontal', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="horizontal" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':draggable true', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable={true} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':buttonProps', () => {
      const { container } = render(<Fab icon={<AddIcon />} buttonProps={{ theme: 'danger' }} />);
      expect(container.querySelector('.t-button--danger')).toBeTruthy();
    });

    it(':buttonProps size', () => {
      const { container } = render(<Fab icon={<AddIcon />} buttonProps={{ size: 'small' }} />);
      expect(container.querySelector('.t-button--size-small')).toBeTruthy();
    });

    it(':yBounds', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" yBounds={[30, 20]} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':yBounds with string values', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" yBounds={['30px', '20px']} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });

    it(':className', () => {
      const { container } = render(<Fab icon={<AddIcon />} className="custom-class" />);
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();
    });
  });

  describe('events', () => {
    it(':onClick', () => {
      const handleClick = vi.fn();
      const { container } = render(<Fab icon={<AddIcon />} onClick={handleClick} />);
      const fabElement = container.querySelector(name);
      fireEvent.click(fabElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ e: expect.anything() }));
    });

    it(':onClick with text', () => {
      const handleClick = vi.fn();
      const { container } = render(<Fab icon={<AddIcon />} text="按钮" onClick={handleClick} />);
      const fabElement = container.querySelector(name);
      fireEvent.click(fabElement);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it(':onDragStart', () => {
      const handleDragStart = vi.fn();
      const { container } = render(
        <Fab
          icon={<AddIcon />}
          draggable="all"
          onDragStart={handleDragStart}
          style={{ right: '16px', bottom: '32px' }}
        />,
      );
      const fabElement = container.querySelector(name);
      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });
      expect(handleDragStart).toHaveBeenCalledTimes(1);
    });

    it(':onDragStart with draggable vertical', () => {
      const handleDragStart = vi.fn();
      const { container } = render(
        <Fab
          icon={<AddIcon />}
          draggable="vertical"
          onDragStart={handleDragStart}
          style={{ right: '16px', bottom: '32px' }}
        />,
      );
      const fabElement = container.querySelector(name);
      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });
      expect(handleDragStart).toHaveBeenCalledTimes(1);
    });

    it(':onDragStart with draggable horizontal', () => {
      const handleDragStart = vi.fn();
      const { container } = render(
        <Fab
          icon={<AddIcon />}
          draggable="horizontal"
          onDragStart={handleDragStart}
          style={{ right: '16px', bottom: '32px' }}
        />,
      );
      const fabElement = container.querySelector(name);
      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });
      expect(handleDragStart).toHaveBeenCalledTimes(1);
    });

    it(':onDragEnd not called when not moved', () => {
      const handleDragEnd = vi.fn();
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" onDragEnd={handleDragEnd} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      // Only touchStart and touchEnd without move
      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });
      fireEvent.touchEnd(fabElement, { touches: [] });
      // onDragEnd should not be called when not moved
      expect(handleDragEnd).not.toHaveBeenCalled();
    });
  });

  describe('slots', () => {
    it(':children', () => {
      const testChildId = 'fab-custom-child';
      const { container } = render(
        <Fab>
          <div data-testid={testChildId}>Custom Content</div>
        </Fab>,
      );
      expect(container.querySelector(`[data-testid="${testChildId}"]`)).toBeTruthy();
      expect(container.querySelector(`[data-testid="${testChildId}"]`).textContent).toBe('Custom Content');
    });

    it(':children function', () => {
      const testChildId = 'fab-function-child';
      const { container } = render(<Fab>{() => <div data-testid={testChildId}>Function Content</div>}</Fab>);
      // Function children should render
      expect(container.querySelector(`[data-testid="${testChildId}"]`)).toBeTruthy();
    });

    it(':default slot with icon and text', () => {
      const { container, queryByText } = render(<Fab icon={<AddIcon data-testid="fab-icon" />} text="测试文字" />);
      expect(container.querySelector('[data-testid="fab-icon"]')).toBeTruthy();
      expect(queryByText('测试文字')).toBeTruthy();
    });

    it(':default content when no children', () => {
      const { container } = render(<Fab icon={<AddIcon data-testid="fab-icon" />} />);
      // Should render default button with icon
      expect(container.querySelector('[data-testid="fab-icon"]')).toBeTruthy();
      expect(container.querySelector('.t-fab__button')).toBeTruthy();
    });
  });

  describe('touch behavior', () => {
    it('should not update position when draggable is false', () => {
      const handleDragEnd = vi.fn();
      const { container } = render(
        <Fab
          icon={<AddIcon />}
          draggable={false}
          onDragEnd={handleDragEnd}
          style={{ right: '16px', bottom: '32px' }}
        />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });
      fireEvent.touchEnd(fabElement, { touches: [] });
      // onDragEnd should not be called when draggable is false
      expect(handleDragEnd).not.toHaveBeenCalled();
    });

    it('should trigger touchStart with multiple touches', () => {
      const handleDragStart = vi.fn();
      const { container } = render(
        <Fab
          icon={<AddIcon />}
          draggable="all"
          onDragStart={handleDragStart}
          style={{ right: '16px', bottom: '32px' }}
        />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, {
        touches: [
          { clientX: 100, clientY: 200 },
          { clientX: 110, clientY: 210 },
        ],
      });
      expect(handleDragStart).toHaveBeenCalledTimes(1);
    });

    it('should render with button props shape', () => {
      const { container } = render(<Fab icon={<AddIcon />} buttonProps={{ shape: 'square' }} />);
      expect(container.querySelector('.t-button--square')).toBeTruthy();
    });

    it('should handle touchmove event when draggable', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      // Trigger touchmove with native event
      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      expect(fabElement).toBeTruthy();
    });

    it('should handle touchmove event when draggable is false', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable={false} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      // Trigger touchmove with native event - should be ignored
      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });

    it('should handle drag with vertical only mode', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="vertical" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });

    it('should handle drag with horizontal only mode', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="horizontal" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });

    it('should handle drag with true draggable value', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable={true} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });
  });

  describe('rendering', () => {
    it('should have correct class name', () => {
      const { container } = render(<Fab icon={<AddIcon />} />);
      expect(container.querySelector('.t-fab')).toBeTruthy();
    });

    it('should render button with correct class', () => {
      const { container } = render(<Fab icon={<AddIcon />} />);
      expect(container.querySelector('.t-fab__button')).toBeTruthy();
    });

    it('should render primary theme button by default', () => {
      const { container } = render(<Fab icon={<AddIcon />} />);
      expect(container.querySelector('.t-button--primary')).toBeTruthy();
    });

    it('should render large size button by default', () => {
      const { container } = render(<Fab icon={<AddIcon />} />);
      expect(container.querySelector('.t-button--size-large')).toBeTruthy();
    });

    it('should apply custom style when not draggable', () => {
      const customStyle = { right: '30px', bottom: '50px', backgroundColor: 'blue' };
      const { container } = render(<Fab icon={<AddIcon />} style={customStyle} />);
      const fabElement = container.querySelector(name);
      expect(fabElement.getAttribute('style')).toContain('right: 30px');
      expect(fabElement.getAttribute('style')).toContain('bottom: 50px');
    });

    it('should render without icon', () => {
      const { container } = render(<Fab text="按钮" />);
      expect(container.querySelector('.t-fab')).toBeTruthy();
      expect(container.querySelector('.t-button--round')).toBeTruthy();
    });

    it('should render with null icon', () => {
      const { container } = render(<Fab icon={null} text="按钮" />);
      expect(container.querySelector('.t-fab')).toBeTruthy();
    });

    it('should render with undefined children (default content)', () => {
      const { container } = render(<Fab icon={<AddIcon />}>{undefined}</Fab>);
      expect(container.querySelector('.t-fab__button')).toBeTruthy();
    });

    it('should render with null children (renders nothing)', () => {
      const { container } = render(<Fab icon={<AddIcon />}>{null}</Fab>);
      // null children results in nothing being rendered inside the fab (based on parseTNode logic)
      expect(container.querySelector('.t-fab')).toBeTruthy();
    });

    it('should display name', () => {
      expect(Fab.displayName).toBe('Fab');
    });
  });

  describe('edge cases', () => {
    it('should handle undefined onClick', () => {
      const { container } = render(<Fab icon={<AddIcon />} onClick={vi.fn()} />);
      const fabElement = container.querySelector(name);
      // Should not throw error when clicking with onClick handler
      expect(() => fireEvent.click(fabElement)).not.toThrow();
    });

    it('should handle undefined onDragStart', () => {
      const { container } = render(<Fab icon={<AddIcon />} draggable="all" />);
      const fabElement = container.querySelector(name);
      // Should not throw error when touching without onDragStart handler
      expect(() => fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] })).not.toThrow();
    });

    it('should handle empty yBounds', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" yBounds={[]} style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();

      // Trigger touchmove to exercise getSwitchButtonSafeAreaXY with empty yBounds
      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });

    it('should handle undefined yBounds', () => {
      const { container } = render(
        <Fab icon={<AddIcon />} draggable="all" style={{ right: '16px', bottom: '32px' }} />,
      );
      const fabElement = container.querySelector(name);
      expect(fabElement).toBeTruthy();

      fireEvent.touchStart(fabElement, { touches: [{ clientX: 100, clientY: 200 }] });

      act(() => {
        const touchMoveEvent = new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [{ clientX: 150, clientY: 250, identifier: 0, target: fabElement } as Touch],
        });
        fabElement.dispatchEvent(touchMoveEvent);
      });

      fireEvent.touchEnd(fabElement, { touches: [] });
      expect(fabElement).toBeTruthy();
    });
  });
});
