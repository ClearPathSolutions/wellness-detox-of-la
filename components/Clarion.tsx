import { site } from "@/lib/site";

/**
 * Clarion Labs chat widget + forms-capture loader.
 *
 * Uses native <script> tags (NOT next/script) on purpose: next/script strips the
 * data-* theming attributes the widget reads, which would leave the launcher teal.
 *
 * The only theming levers the widget honors are the data-* attributes below plus
 * the matching --clarion-chat-* CSS variables. No deeper styling is possible.
 */
const BRAND = {
  color: "#d86c97", // site rose/mauve accent (--color-rose)
  headerText: "#ffffff",
  title: "Chat with us",
  position: "right" as const, // "left" | "right"
  font: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
};

export default function Clarion() {
  const { siteKey, api } = site.widgets.clarion;
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{
  --clarion-chat-color: ${BRAND.color};
  --clarion-chat-header-text: ${BRAND.headerText};
  --clarion-chat-font: ${BRAND.font};
  --clarion-chat-position: ${BRAND.position};
}
/* Below lg (1024px) the full-width MobileCallBar (~64px + safe area) sits at the
   very bottom. The widget's root is hardcoded to bottom:20px with no offset var,
   so lift it above the bar on mobile. The panel is anchored to this root, so it
   moves with the launcher. Double-class beats Clarion's single-class specificity. */
@media (max-width: 1023.98px){
  .clarion-chat.clarion-chat{
    bottom: calc(76px + env(safe-area-inset-bottom, 0px)) !important;
  }
}`,
        }}
      />
      <script
        src="https://www.clarionlabs.ai/widget.v1.js"
        async
        data-site-key={siteKey}
        data-api={api}
        data-color={BRAND.color}
        data-header-text={BRAND.headerText}
        data-title={BRAND.title}
        data-position={BRAND.position}
        data-font={BRAND.font}
      />
      <script
        src="https://www.clarionlabs.ai/forms-capture.v1.js"
        async
        data-site-key={siteKey}
        data-api={api}
      />
    </>
  );
}
