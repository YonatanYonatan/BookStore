/**
 * Created by Yonatan.Vainer on 7/10/2015.
 */
angular.module('CoverService', [])

    .factory('CoverService', function(){

        var cover = "";

        return {
            setCover: function(name){
                cover = '/api/images/'+name;
            },
            getCover: function(){
                return cover;
            }
        };

    });