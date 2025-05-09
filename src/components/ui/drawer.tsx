import * as React from "react"

import { cn } from "@/lib/utils"

// Simple drawer implementation without vaul dependency
const Drawer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    shouldScaleBackground?: boolean;
  }
>(({ className, children, open, onOpenChange, ...props }, ref) => {
  return open ? (
    <React.Fragment>
      <div 
        className="fixed inset-0 z-50 bg-black/80" 
        onClick={() => onOpenChange?.(false)}
      />
      <div
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </div>
    </React.Fragment>
  ) : null;
})
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
  HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    asChild?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ onClick, onOpenChange, ...props }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      onClick?.(e);
      onOpenChange?.(true);
    }}
    {...props}
  />
))
DrawerTrigger.displayName = "DrawerTrigger"

const DrawerClose = React.forwardRef<
  HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    asChild?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ onClick, onOpenChange, ...props }, ref) => (
  <button
    ref={ref}
    onClick={(e) => {
      onClick?.(e);
      onOpenChange?.(false);
    }}
    {...props}
  />
))
DrawerClose.displayName = "DrawerClose"

const DrawerContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col", className)}
    {...props}
  >
    {children}
  </div>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
