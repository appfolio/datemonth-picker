// Shims MouseEvents to support event.path property

export default function path(event) {
  if (event.path) {
    return event.path;
  }

  let path = [];
  var node = event.target;
  while(node != document.body && node.parentNode) {
   path.push(node);
   node = node.parentNode;
  }
  return path;
}
