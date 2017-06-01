const
$path = '',
$dest = '../dest',
    // 打包
    qfyxPack = {
        '/assets/css/qfyxCom.css': [
        '/assets/plugins/materialize/sass/materialize.{scss,css}',
        '/assets/css/**.{css,scss}',
        '/assets/plugins/jquery/swiper/swiper.min.css'
        ],
        '/assets/js/qfyxCom.js': [
        '/assets/plugins/libs/jquery-2.1.3.min.js',
        '/assets/plugins/libs/materialize.min.js',
        '/assets/plugins/libs/mod.js'
        ]
    };

// 启用插件
// fis.hook('relative');

// 让所有文件，都使用相对路径。
fis.match('**', {
    // relative: true,
    deploy: fis.plugin('local-deliver', {
        to: $dest
    })
});
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define'
    }
});

/*首先要配置FIS中使用csssprites*/
fis.config.set('modules.spriter', 'csssprites');
// 忽视模块化js中的require
fis.hook('commonjs');

fis

.match('/(*).html', {
    release: '/$1.html'
})
.match('/assets/plugins/jquery/(**).js', {
    isMod: true,
    moduleId: '$1'
})
.match('/assets/js/(**).js', {
    isMod: true,
    moduleId: '$1'
})
.match('/assets/plugins/materialize/sass/materialize.scss', {
    parser: fis.plugin('node-sass'),
    optimizer: fis.plugin('clean-css', {
        'keepBreaks': true
    }),
    preprocessor: fis.plugin('autoprefixer', {
        'browsers': ['Android >= 2.1', 'iOS >= 4', 'ie >= 8', 'firefox >= 15'],
        'cascade': true
    }),
    rExt: 'css'
})
.match('/assets/css/(**).{scss,css}',{
    parser: fis.plugin('node-sass'),
    optimizer: fis.plugin('clean-css', {
        'keepBreaks': true
    }),
    preprocessor: fis.plugin('autoprefixer', {
        'browsers': ['Android >= 2.1', 'iOS >= 4', 'ie >= 8', 'firefox >= 15'],
        'cascade': true
    }),
    rExt: 'css'
})
.match('/pages/**/(*.{png,jpg,gif,PNG,JPG,JPEG,GIF})', {
    release: '/assets/images/$1'
})

.match('::package', {
    postpackager: fis.plugin('loader', {
        resourceType: 'commonJs',
        useInlineMap: true
    }),
    //      postpackager: fis.plugin('loader', {
    //          resourceType: 'amd',
    //          useInlineMap: true // 资源映射表内嵌1
    //      }),
    packager: fis.plugin('deps-pack', qfyxPack),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '20'
    })
});

// 生产
fis
.media('prod')
.match('/**/*.js', {
    optimizer: fis.plugin('uglify-js')
})
.match('/assets/**.png', {
    optimizer: fis.plugin('png-compressor')
})
    // .match('/assets/**.{js,css}', {
    //     useHash: true
    // })
    // .match('/({layouts,views,partials,widgets})/(*)/(*)/*.{png,jpg,gif,PNG,JPG,JPEG,GIF}', {
    //     release: '/aseets/images/qfyx_1.0/$1/$2'
    // })
    // .match('*.html', {
    //     deploy: [
    //         fis.plugin('replace', {
    //             from: /<!--.*?-->/gi,
    //             to: ''
    //         }),
    //         fis.plugin('local-deliver')
    //     ],
    //      deploy: [
    //         fis.plugin('replace', {
    //             from: /<!--[\S\s]*?-->/gi,
    //             to: ''
    //         }),
    //         fis.plugin('local-deliver')
    //     ]
    // })
    ;

// function replacer(opt) {
//  if(!Array.isArray(opt)) {
//      opt = [opt];
//  }
//  var r = [];
//  opt.forEach(function(raw) {
//      r.push(fis.plugin('replace', raw));
//  });
//  return r;
// };