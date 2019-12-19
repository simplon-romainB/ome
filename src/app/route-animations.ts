import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';
 export const slideInAnimation =
 trigger('routeAnimations', [
      transition('* => *', [
           query(':enter, :leave', 
                style({ position: 'fixed', width: '100%' }), 
                { optional: true }),        
           group([
                query(':enter',[
                    style({ transform: 'translateY(100vh)' }),
                    animate('0.5s ease-in-out', 
                    style({ transform: 'translateY(0vh)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateY(0vh)'}),
                    animate('0.5s ease-in-out',
                    style({ opacity: 0, transform: 'translateY(-100vh)' }))
                ], { optional: true }),
           ])
      ]) 
]);

