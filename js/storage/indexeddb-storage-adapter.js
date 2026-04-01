// Future scaffold only. The current app remains synchronous and uses
// localStorage in production, but this shape gives the storage layer a
// stable place to grow into IndexedDB or cloud-backed persistence later.
export function createIndexedDbStorageAdapterScaffold(options = {}) {
    return Object.freeze({
        kind: 'indexeddb-scaffold',
        async: true,
        status: 'not-implemented',
        databaseName: options.databaseName || 'woof-cal',
        version: Number(options.version) || 1,
        notes: [
            'Future adapter target for IndexedDB-backed persistence.',
            'Current repositories remain synchronous and continue using localStorage.',
            'Migration should preserve the current key naming and schema version semantics.'
        ]
    });
}
