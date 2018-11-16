import App from '../page/<%= pageName %>/component/App';
import VueRouter from 'vue-router';
<% if(options.operation.indexOf('edit') !== -1 && !options.isHandle){ %>import edit from '../page/<%= pageName %>/component/edit';<% } %><% if(options.operation.indexOf('add') !== -1 && !options.isHandle){ %>
import add from '../page/<%= pageName %>/component/add';<% } %><% if(options.operation.indexOf('view') !== -1){ %>
import view from '../page/<%= pageName %>/component/view';<% } %><% if(options.isHandle){ %>
import handle from '../page/<%= pageName %>/component/handle';<% } %>
export default new VueRouter({
    routes: [{
        path: '/',
        redirect: '/app'
    }, {
        path: '/app',
        component: App,
        children: 
        [
            <% if(options.operation.indexOf('edit') !== -1 && !options.isHandle){ %>{ 
                path: 'edit',
                component: edit
            }<% } %><% if(options.operation.indexOf('add') !== -1 && !options.isHandle){ %>,
            { 
                path: 'add',
                component: add
            }<% } %><% if(options.operation.indexOf('view') !== -1){ %>,
            { 
                path: 'view',
                component: view
            }<% } %><% if(options.isHandle){ %>,
            { 
                path: ':handle',
                component: handle
            }<% } %>
        ]
    }]
});

