<div class="container" ng-controller="AddBooksController as bookCtrl" ng-show="onAdd">

    <div class="row">

        <div class="col-lg-12">
            <form class="form-horizontal" ng-submit="bookCtrl.addBook()">
                <div class="form-group">
                    <label class="control-label col-xs-2">Book Name:</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" ng-model="bookCtrl.newbook.title" required><br>

                    </div>

                </div>
                <div class="form-group">
                    <label class="control-label col-xs-2">Book Author:</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" ng-model="bookCtrl.newbook.author" required><br>

                    </div>

                </div>
                <div class="form-group">
                    <label class="control-label col-xs-2">Book Year:</label>
                    <div class="col-xs-10">
                        <input type="text" class="form-control" ng-model="bookCtrl.newbook.year" required><br>

                    </div>

                </div>
                <div class="form-group">
                    <div class="col-xs-offset-2 col-xs-10">
                        <button type="submit" class="btn btn-primary">Add Now!</button>

                    </div>
                </div>
            </form>

        </div>

    </div>

</div>