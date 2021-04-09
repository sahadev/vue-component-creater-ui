export default function(code, { imports }) {
  return {
    name: 'get-imports',

    visitor: {
      ImportDeclaration(path) {
        imports.push({
          variables: path.node.specifiers.map(spec => ({
            local: spec.local.name,
            imported: spec.imported ? spec.imported.name : 'default'
          })),
          module: path.node.source.value
        });
        path.remove();
      }
    }
  };
}
