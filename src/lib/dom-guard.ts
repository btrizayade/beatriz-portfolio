// Browser translators and in-preview text edits can move or wrap text nodes
// React owns; React then crashes with removeChild/insertBefore NotFoundError.
// Make those two DOM calls tolerant so the page keeps rendering.
export function installDomGuard() {
  if (typeof window === 'undefined' || typeof Node === 'undefined') return;
  const proto = Node.prototype as Node & { __guarded?: boolean };
  if (proto.__guarded) return;
  proto.__guarded = true;
  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      if (child.parentNode) child.parentNode.removeChild(child);
      return child;
    }
    return removeChild.call(this, child) as T;
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return insertBefore.call(this, node, null) as T;
    return insertBefore.call(this, node, ref) as T;
  };
}
