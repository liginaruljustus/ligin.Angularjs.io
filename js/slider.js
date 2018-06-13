(function () {
        angular
            .module('myApp', [])
            .controller('sliderController', [
                '$scope',
                '$window',
                '$interval',
                function ($scope, $window, $interval) {
                    $scope.json = {
                        "slides": [{
                                "image": 'images/images-1.jpg',
                                "title": 'Lorem ipsum slide 1',
                                "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quis, quae. Oditdignissimos, soluta. Praesentium quas optio dolor, cumque libero laudantium ab asperiores error doloremque veniam, nobis nemo doloribus sequi.'
                            },
                            {
                                "image": 'images/images-2.jpg',
                                "title": 'Lorem ipsum slide 2',
                                "text": 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi quis, quae. Oditdignissimos, soluta. Praesentium quas optio dolor, cumque libero laudantium ab asperiores error doloremque veniam, nobis nemo doloribus sequi.'
                            }
                        ]
                    }
                     
                    // Don't change
                    $scope.active = 0;
                    $scope.sliderLength = $scope.json.slides.length - 1;

                    // options width default values,
                    // feel free to change
                    $scope.transition = '0.4';
                    $scope.showPagination = true;
                    $scope.showButtons = true;
                    $scope.infiniteScroll = true;
                    $scope.getWindowWidth = function () {
                        return window.innerWidth ||
                            document.documentElement.clientWidth;
                    }

                    angular.element($window).bind('resize', () => {
                        const vm = $scope;
                        $scope.$apply(() => {
                            vm.animateSlides(vm.active, 0);
                        })
                    });

                    $scope.goToSlide = (index) => {
                        var slideDiffrence = 0;
                        if ($scope.infiniteScroll) {
                            index = index === -1 ? $scope.sliderLength : index;
                            index = index === $scope.sliderLength + 1 ? 0 : index;
                        } else {
                            index = index === -1 ? 0 : index;
                            index = index === $scope.sliderLength + 1 ? $scope.sliderLength : index;
                        }
                        slideDiffrence = Math.abs($scope.active - index);
                        $scope.active = index;
                        $scope.animateSlides(index, $scope.transition * slideDiffrence);
                    }

                    $scope.animateSlides = (index, transition) => {
                        $scope.sliderStyle = {
                            transform: 'translate3d(' + (-index * $scope.getWindowWidth()) + 'px,0px, 0px)',
                            transition: transition + 's'
                        }
                       
                        $scope.setTransitionDelay = {
                               transitionDelay: transition - 0.2 + 's'
                        }
                    }
                }
            ]);
    }());
	
	