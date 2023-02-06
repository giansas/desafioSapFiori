sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimages.controller.Inicial", {
            onInit: function () {
                let ImageList = {
                    Imagens:
                     [/* aqui estão imagens fixas da tela
                        {
                            url: "https://recipes.heart.org:443/-/media/images/healthy-living/recipes/banana_bread_recipe_no_sugar.jpg",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=3406011056403318947",
                            title: "Banana Bread | American Heart Association Recipes",
                            provider: {
                                name: "shopify"
                            }
                        },
                        {
                            url: "https://www.iuf.org/wp-content/uploads/2020/09/Coca-Cola-Header.jpg",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=1574528931575308325",
                            title: "Coca-Cola - IUF",
                            provider: {
                                name: "iuf"
                            }
                        },
                        {
                            url: "https://img.yumpu.com/51789413/1/117x151/pepsi-revised-story.jpg?quality=85",
                            thumbnail: "https://rapidapi.usearch.com/api/thumbnail/get?value=580148335407608069",
                            title: "Pepsi Magazines",
                            provider: {
                                name: "yumpu"
                            }
                        },*/
                    ]
                };

                //  Criação do modelo para exibir dados na tela
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");

            },

            onPressBuscar: function(){
                //  instancia o objeto input na variavel
                let inputBusca = this.byId("inpBusca");
                //  coletando valor informado no input
                let query = inputBusca.getValue();
                //  alert(query);

                //  codigo copiado da API
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //  concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" 
                    + query
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "2b55105480mshb6d18334966dd3fp1ab16cjsn419e90dfc5a1",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                

                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //  instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    //  clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //  loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;

                    //  loop - for
                    for(var i = 0; i < listaResultados.length;i++){
                        //  read table pelo indice
                        newItem = listaResultados[i];
                        //  append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }

                    oImageModel.refresh();

                }.bind(this)
                );


            }
        });
    });
