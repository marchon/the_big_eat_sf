/**
 * Big eats model. represents a big eats scavenger hunt
 *
 * @author mattt
 */
Ext.regModel('BigEats', {
    idProperty: 'bigeat_id',
    fields: ['bigeat_id', 'abbreviation', 'year', 'tagline']
});

/**
 * Big eats store
 *
 * @author mattt
 */
BigEats.stores.BigEats = new Ext.data.JsonStore({
    model: 'BigEats',
    
    data: [{
        bigeat_id: 'bigeats-2010',
        abbreviation: 'Big Eats 2010',
        year: '2010',
        tagline: '100 Things to Eat & Drink Before You Die',
    }, {
        bigeat_id: 'bigeats-2009',
        abbreviation: 'Big Eats 2009',
        year: '2009',
        tagline: '100 Things to Eat & Drink Before You Die',
    }, {
        bigeat_id: 'bigsweets-2010',
        abbreviation: 'Big Sweets 2010',
        year: '2010',
        tagline: '50 Treats to Eat Before You Die',
    }, ]
});
