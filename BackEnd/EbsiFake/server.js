const express = require('express');
const app = express();

const didDocument = {
    "@context": [
        "https://www.w3.org/ns/did/v1",
        "https://w3id.org/security/suites/jws-2020/v1"
    ],
    "controller": [
        "did:ebsi:z21Bs13TqhZV7RY727hX22XF"
    ],
    "id": "did:ebsi:z21Bs13TqhZV7RY727hX22XF",
    "verificationMethod": [
        {
            "controller": "did:ebsi:z21Bs13TqhZV7RY727hX22XF",
            "id": "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0",
            "publicKeyJwk": {
                kty: 'EC',
                x: 'Qk_Y4oc5koNuIRcuQgWF4089cNPkEkAGmn5PGbhZBDk',
                y: 'HEGgwaSkBn058JOpu_Xc0PLieNkfTSXA36S8Azwrx90',
                crv: 'P-256'
            },
            "type": "JsonWebKey2020"
        }
    ],
    "authentication": [
        "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0"
    ],
    "capabilityInvocation": [
        "did:ebsi:z21Bs13TqhZV7RY727hX22XF#_bQu28sgqr1qnjSjJEKBGnRDilhlz7AtYYp5mMg83r0"
    ],
    "assertionMethod": [],
    "capabilityDelegation": [],
    "keyAgreement": []
};


app.get('/did-registry/v5/identifiers/:did', (req, res) => {
    console.log(`Petición de DID recibida: ${req.params.did}`);
    if (req.params.did === 'did:ebsi:z21Bs13TqhZV7RY727hX22XF') {
        res.json(didDocument);
        
    } else {
        res.status(404).send('DID not found');
    }
});
app.get('/', (req, res) => {
    console.log('Petición recibida a la ruta raíz /');
    res.send('Hola desde el backend');
});

app.listen(2000, () => {
    console.log('Fake EBSI DID Registry running at http://localhost:2000');
});
