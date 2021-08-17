const { Router } = require('express');

const user = require('../domain/user');

const router = Router();

router.post('/create', async(req, res) => {
    const data = await user.create(req.body);
    res.json(data);
    //res.json({txt:'creado'});
});
router.get('/read', async(req, res)=>{
    res.json({txt:'leido'});
});
router.put('/update', async(req, res)=>{
    res.json({txt:'actualizado'});
});
router.delete('/delete', async(req, res)=>{
    res.json({txt:'eliminado'});
});

module.exports = router;