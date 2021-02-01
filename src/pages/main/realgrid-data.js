export const fields = [
    {
        fieldName: 'Minorcd',
     },
     {
        fieldName: 'Minornm',
     },
    {
    fieldName: 'Minor',
},
{
    fieldName: 'CNT',
},
{
    fieldName: 'Remark',
},
{
    fieldName: 'Item1',
},{
    fieldName: 'Item2',
},{
    fieldName: 'Item3',
},{
    fieldName: 'Item4',
},{
    fieldName: 'UseYn',
},
];



export const columns = [
    {
        name: "Minorcd",
        fieldName: "Minorcd",
        type: "data",
        width: "150",
        styles: {
            textAlignment: "center"
        },
        header: {
            text: "Minor코드",
            showTooltip: false,
        }
    },
    {
        name: "Minornm",
        fieldName: "Minornm",
        type: "data",
        width: "80",
        styles: {
            textAlignment: "center"
        },
        
        header: {
            text: "코드명",
            showTooltip: true,
            tooltip:'<span style="color: red;">이름</span>',
        },
    },
    {
        name: "Minor",
        fieldName: "Minor",
        type: "data",
        width: "80",
        editor:{
            textReadOnly: true,
        },
        styles: {
            textAlignment: "center"
        },
        
        header: {
            text: "Minor",
            showTooltip: true,
            tooltip:'<span style="color: red;">이름</span>',
        },
    },
    {
        name: "CNT",
        fieldName: "CNT",
        type: "data",
        width: "80",
        editor:{
            textReadOnly: true,
        },
        styles: {
            textAlignment: "center"
        },
        
        header: {
            text: "갯수",
            showTooltip: true,
            tooltip:'<span style="color: red;">이름</span>',
        },
    },
  {
    name: "Remark",
    fieldName: "Remark",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "Remark",
        showTooltip: false,
    },
},{
    name: "Item1",
    fieldName: "Item1",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "Item1",
        showTooltip: false,
    },
},{
    name: "Item2",
    fieldName: "Item2",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "Item2",
        showTooltip: false,
    },
},{
    name: "Item3",
    fieldName: "Item3",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "Item3",
        showTooltip: false,
    },
},{
    name: "Item4",
    fieldName: "Item4",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "Item4",
        showTooltip: false,
    },
},{
    name: "UseYn",
    fieldName: "UseYn",
    type: "data",
    width: "80",
    styles: {
        textAlignment: "center"
    },
    header: {
        text: "사용여부",
        showTooltip: false,
    },
}
]
