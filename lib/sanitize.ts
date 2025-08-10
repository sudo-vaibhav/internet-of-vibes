// Very basic sanitizer for our deterministic HTML templates: allow tags/attrs; strip scripts/styles/imports and external CSS URLs
export function sanitizeHtml(html: string): string {
  // Remove script/style tags entirely
  html = html.replace(/<\/(?:script|style)>/gi, "").replace(/<(?:script|style)[\s\S]*?>[\s\S]*?<\/(?:script|style)>/gi, "");
  // Remove @import in style attributes or blocks just in case
  html = html.replace(/@import\s+url\([^)]*\);?/gi, "");
  // Remove external CSS link hrefs
  html = html.replace(/<link[^>]*rel=["']?stylesheet["']?[^>]*>/gi, (m) => (m.includes("href=\"") ? "" : m));
  // Disallow on* event handlers
  html = html.replace(/ on[a-z]+="[^"]*"/gi, "");
  // Remove javascript: URLs
  html = html.replace(/href\s*=\s*"javascript:[^"]*"/gi, 'href="#"');
  return html;
}
