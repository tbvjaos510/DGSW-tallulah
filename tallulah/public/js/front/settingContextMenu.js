$(function () {
    $.contextMenu({
        selector: '[project_ident]',
        callback: function (key, options) {
            if (key == "add") {
                var name = prompt("생성할 파일의 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "file/create",
                        data: {
                            pident: $(this).attr("project_ident"),
                            name: name
                        },
                        method: "POST",
                        success: function(result){
                            console.log("프로젝트 밑에 디렉터리 파일");
                            console.log(result);
                            tree.addFile(result.file);
                        }
                    });
                }
            } else if (key == "addDir") {
                var name = prompt("생성할 디렉터리 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "directory/create",
                        data: {
                            dirName: name,
                            ident: $(this).attr("project_ident")
                        },
                        method: "POST",
                        success: function(result){
                            console.log("프로젝트 밑에 디렉터리 생성");
                            console.log(result);
                            tree.addDir(result.data);
                        }
                    });
                }
            }
        },
        items: {
            "add": { name: "Add", icon: "add" },
            "addDir": { name: "AddDir", icon: "add" }
        }
    });
    $.contextMenu({
        selector: '[dir_ident]',
        callback: function (key, options) {
            if (key == "add") {
                var name = prompt("생성할 파일의 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "file/create",
                        data: {
                            pident: $(this).attr("parent_project"),
                            ident: $(this).attr("dir_ident"),
                            name: name
                        },
                        method: "POST",
                        success: function(result){
                            console.log(result);
                            tree.addFile(result.file);
                        }
                    });
                }
            } else if (key == "addDir") {
                var name = prompt("생성할 디렉터리 이름");
                if (!(name == null || name == "")) {
                    $.ajax({
                        url: "directory/create",
                        data: {
                            dirName: name,
                            ident: $(this).attr("parent_project"),
                            dirident: $(this).attr("dir_ident")
                        },
                        method: "POST",
                        success: function(result){
                            tree.addDir(result.data);
                        }
                    });
                }
            } else if(key == "rename"){
                var name = prompt("바꿀 이름");
                if(!(name == null && name == "")){
                    $(this).children('.tree-title').html(name);
                }
            } else if (key == "delete"){
                $.ajax({
                    url: "directory/delete",
                    method: "POST",
                    data: {ident: $(this).attr("dir_ident")},
                    success: function(result){
                        alert(result.message);
                    }
                });
                $(this).remove();
            }
        },
        items: {
            "add": { name: "AddFile", icon: "add" },
            "addDir": { name: "AddDir", icon: "add" },
            "rename": { name: "rename", icon: "edit" },
            "delete": { name: "Delete", icon: "delete" }
        }
    });

    $.contextMenu({
        selector: '[file_ident]',
        callback: function (key, options) {
            if(key == 'rename'){
                var name = prompt('바꿀 이름');
                if(!(name==null && name=="")){
                    $(this).children('.tree-title').html(name);
                }
            } else if(key == 'delete'){
                $.ajax({
                    url: "file/delete",
                    method: "POST",
                    data: {ident: $(this).attr("file_ident")},
                    success: function(result){
                        alert(result.message);
                    }
                });
                $(this).remove();
            }
        },
        items: {
            "rename": {name: "rename", icon:"edit"},
            "delete": { name: "Delete", icon: "delete" }
        }
    });
    

    //빈곳에서 우클릭
    // $.contextMenu({
    //     selector: '.nav',
    //     callback: function(key, options){

    //     },
    //     items: {
    //         ""
    //     }
    // });

    $.contextMenu({
        selector: '.nav',
        callback: function (key, options) {
            if(key == 'create Project'){
                tree._addProject();
            } 
        },
        items: {
            "create Project": {name: "create Project", icon:"product-hunt"},
        }
    });

});