const tables=[
    {id:"table1", name:"Table-1", total:0,items:{}},
    {id:"table2", name:"Table-2", total:0,items:{}},
    {id:"table3", name:"Table-3", total:0,items:{}},
]

const menuItems=[
    {id:"item1", name:"Biryani", price:100, type:"main-course"},
    {id:"item2", name:"Paneer", price:150, type:"starter"},
    {id:"item3", name:"Chicken curry", price:300, type:"main-course"},
]

document.addEventListener("DOMContentLoaded", ()=>{
    renderMenu(menuItems);
    renderTable(tables);
});

function renderMenu(menuItems){
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML="";
    menuItems.forEach((item)=>{
        const menuItem = document.createElement("div");
        menuItem.className="menu-item";
        menuItem.id=item.id;
        menuItem.draggable=true;
        menuItem.dataset.name=item.name;
        menuItem.dataset.type=item.type;
        menuItem.dataset.price= item.price;
        menuItem.innerHTML=`
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        `;
        menuContainer.append(menuItem);
        menuItem.addEventListener("dragstart", dragStart);
    });
}

function renderTable(tables){
    const tableContainer = document.getElementById("tables-container");
    tableContainer.innerHTML="";
    tables.forEach((table)=>{
        const tableCard = document.createElement("div");
        tableCard.className="table-card";
        tableCard.id = table.id;
        tableCard.innerHTML=`
        <h3>${table.name}</h3>
        <p>Total: ${table.total}</p>
        <p>Items</p>
        `;
        tableContainer.append(tableCard);
        tableCard.addEventListener("dragover", dragOver);
        tableCard.addEventListener("drop", dropItem);
    });
}

function dragStart(e){
    e.dataTransfer.setData("text/plain", e.target.id)
};

function dragOver(e){
    e.preventDefault();
}

function dropItem(e){
    e.preventDefault();
    const itemId = e.dataTransfer.getData("text");
    const itemElement = document.getElementById("itemId");
    const itemName = itemElement.dataset.name;
    const itemPrice = itemElement.dataset.price;
    const tableId = e.target.id;

    if(itemName && itemPrice && tables.find((table)=>table.id == tableId)){
        addItemToTable(tableId, itemName, itemPrice);
    }
}

function addItemToTable(tableId, itemPrice, itemName){
    const table = tables.find((table)=>table.id == tableId)
    if(!table.items[itemName]){
        table.items[itemName] = {quantity: 0, price:itemPrice};
    }
}