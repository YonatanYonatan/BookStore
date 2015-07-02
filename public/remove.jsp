<div class="container" ng-controller="RemoveBooksController as bookCtrl" ng-show="onRemove">

    <div class="row">

        <div class="col-lg-12">

            <form class="form-horizontal" ng-submit="bookCtrl.removeBook()">

                <div class="form-group">
                    <label class="control-label col-xs-2">Book ID:</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" ng-model="bookCtrl.id" required><br>

                    </div>

                </div>
                <div class="form-group">
                    <div class="col-xs-offset-2 col-xs-10">
                        <button type="submit" class="btn btn-primary">Remove Now!</button>

                    </div>
                </div>
            </form>

        </div>

    </div>

</div>