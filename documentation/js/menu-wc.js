'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">blog documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' : 'data-target="#xs-controllers-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' :
                                            'id="xs-controllers-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' : 'data-target="#xs-injectables-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' :
                                        'id="xs-injectables-links-module-AuthModule-0dc6d6fbaac0eac910d596f365142c7288fa0202d4cc5c8fcdbb8291ea93f15ee76fbde34111c3a66d3e0cdd2a37cab0512f242ac40c2c82f588ea1dd17b9c3a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CategoryModule.html" data-type="entity-link" >CategoryModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' : 'data-target="#xs-controllers-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' :
                                            'id="xs-controllers-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' }>
                                            <li class="link">
                                                <a href="controllers/CategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' : 'data-target="#xs-injectables-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' :
                                        'id="xs-injectables-links-module-CategoryModule-e8c887913f149aaaf8f741a402f6b8ef30b7ec5f5a639a8771e9b9d212897f1de5dba7a80d086657c72cc9cc4fa07ed15cb4cd85f2e9008de3ff6a7612708f1b"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-722b04e395ec23867b761eeab8624b84e6078bcb926c506c6a2bf3e092f0a787bf2b1ef4c68e733eaf45e716759484aed1b924960d650383675a7177d14ec6be"' : 'data-target="#xs-injectables-links-module-MailModule-722b04e395ec23867b761eeab8624b84e6078bcb926c506c6a2bf3e092f0a787bf2b1ef4c68e733eaf45e716759484aed1b924960d650383675a7177d14ec6be"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-722b04e395ec23867b761eeab8624b84e6078bcb926c506c6a2bf3e092f0a787bf2b1ef4c68e733eaf45e716759484aed1b924960d650383675a7177d14ec6be"' :
                                        'id="xs-injectables-links-module-MailModule-722b04e395ec23867b761eeab8624b84e6078bcb926c506c6a2bf3e092f0a787bf2b1ef4c68e733eaf45e716759484aed1b924960d650383675a7177d14ec6be"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MinioModule.html" data-type="entity-link" >MinioModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MinioModule-1b1def33e591d49e27cde00f190b690bf4b2595b11267fb043056c2be8a8bd1f8b0d00f47e33822815178021e7d3ff9cb94d34e43b84fa74e909f2330ee94c5a"' : 'data-target="#xs-injectables-links-module-MinioModule-1b1def33e591d49e27cde00f190b690bf4b2595b11267fb043056c2be8a8bd1f8b0d00f47e33822815178021e7d3ff9cb94d34e43b84fa74e909f2330ee94c5a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MinioModule-1b1def33e591d49e27cde00f190b690bf4b2595b11267fb043056c2be8a8bd1f8b0d00f47e33822815178021e7d3ff9cb94d34e43b84fa74e909f2330ee94c5a"' :
                                        'id="xs-injectables-links-module-MinioModule-1b1def33e591d49e27cde00f190b690bf4b2595b11267fb043056c2be8a8bd1f8b0d00f47e33822815178021e7d3ff9cb94d34e43b84fa74e909f2330ee94c5a"' }>
                                        <li class="link">
                                            <a href="injectables/MinioService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MinioService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' : 'data-target="#xs-controllers-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' :
                                            'id="xs-controllers-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' }>
                                            <li class="link">
                                                <a href="controllers/PostCommentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostCommentController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PostController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' : 'data-target="#xs-injectables-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' :
                                        'id="xs-injectables-links-module-PostModule-a3a9064a5f0c04814337217292c6914b59232fd4ded524396d640e70cf7ee1dce89b89593f95cab5ddba1edf7c49fa11b2573f49716b4089e26e74530f9bc983"' }>
                                        <li class="link">
                                            <a href="injectables/CategoryRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CategoryRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostCommentRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostCommentRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostCommentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostCommentService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostLikeRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostLikeRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-PrismaModule-e6f5510305b3a6ce74ad097da3ebc9c67596ae0ccf50ac825248b1d03ebb127f44b018c3ddf72967ab3505d80419ca3f9beac3b36e9db9942c122fd7cb776678"' : 'data-target="#xs-injectables-links-module-PrismaModule-e6f5510305b3a6ce74ad097da3ebc9c67596ae0ccf50ac825248b1d03ebb127f44b018c3ddf72967ab3505d80419ca3f9beac3b36e9db9942c122fd7cb776678"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-e6f5510305b3a6ce74ad097da3ebc9c67596ae0ccf50ac825248b1d03ebb127f44b018c3ddf72967ab3505d80419ca3f9beac3b36e9db9942c122fd7cb776678"' :
                                        'id="xs-injectables-links-module-PrismaModule-e6f5510305b3a6ce74ad097da3ebc9c67596ae0ccf50ac825248b1d03ebb127f44b018c3ddf72967ab3505d80419ca3f9beac3b36e9db9942c122fd7cb776678"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RedisModule-cbf36d59af4bc81e7414a87e951797755ca059107b76147cdfdcee3749951abe79ec78ccd5006c0a6c083016b916c9f88918cf92a2891ee35d23b61a9e837ef2"' : 'data-target="#xs-injectables-links-module-RedisModule-cbf36d59af4bc81e7414a87e951797755ca059107b76147cdfdcee3749951abe79ec78ccd5006c0a6c083016b916c9f88918cf92a2891ee35d23b61a9e837ef2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RedisModule-cbf36d59af4bc81e7414a87e951797755ca059107b76147cdfdcee3749951abe79ec78ccd5006c0a6c083016b916c9f88918cf92a2891ee35d23b61a9e837ef2"' :
                                        'id="xs-injectables-links-module-RedisModule-cbf36d59af4bc81e7414a87e951797755ca059107b76147cdfdcee3749951abe79ec78ccd5006c0a6c083016b916c9f88918cf92a2891ee35d23b61a9e837ef2"' }>
                                        <li class="link">
                                            <a href="injectables/RedisService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RedisService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' : 'data-target="#xs-controllers-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' :
                                            'id="xs-controllers-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' }>
                                            <li class="link">
                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' : 'data-target="#xs-injectables-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' :
                                        'id="xs-injectables-links-module-UploadModule-431cd9de29fad7a82f8345cf80afccc382535d10dfaec661f7834fbf7284720201e89f456d75308147d80bbff45175a7b8a5ff7d2aa7f1436efd3a93e7ca1ef9"' }>
                                        <li class="link">
                                            <a href="injectables/PostRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' : 'data-target="#xs-controllers-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' :
                                            'id="xs-controllers-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' : 'data-target="#xs-injectables-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' :
                                        'id="xs-injectables-links-module-UserModule-f15f02e6e33872a628d97c4ac9303412587f324b732237b5dd7a153bb593770d44d3f003d83c3f712cbbdc3b460526f8b88e362a0c7f57e1c980e8a87de2c738"' }>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CategoryNotFound.html" data-type="entity-link" >CategoryNotFound</a>
                            </li>
                            <li class="link">
                                <a href="classes/CommentNotFound.html" data-type="entity-link" >CommentNotFound</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCategoryDto.html" data-type="entity-link" >CreateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCommentDto.html" data-type="entity-link" >CreateCommentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DuplicateCategory.html" data-type="entity-link" >DuplicateCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/DuplicateEmail.html" data-type="entity-link" >DuplicateEmail</a>
                            </li>
                            <li class="link">
                                <a href="classes/DuplicateUser.html" data-type="entity-link" >DuplicateUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorDeleteFile.html" data-type="entity-link" >ErrorDeleteFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/ErrorUploadFile.html" data-type="entity-link" >ErrorUploadFile</a>
                            </li>
                            <li class="link">
                                <a href="classes/FileSizeTooLarge.html" data-type="entity-link" >FileSizeTooLarge</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetAuthorIdParam.html" data-type="entity-link" >GetAuthorIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmailCodeDto.html" data-type="entity-link" >GetEmailCodeDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmailDto.html" data-type="entity-link" >GetEmailDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmailPassDto.html" data-type="entity-link" >GetEmailPassDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetEmailVerificationDto.html" data-type="entity-link" >GetEmailVerificationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetIdParam.html" data-type="entity-link" >GetIdParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserInfoDto.html" data-type="entity-link" >GetUserInfoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsernameDto.html" data-type="entity-link" >GetUsernameDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/InvalidCategory.html" data-type="entity-link" >InvalidCategory</a>
                            </li>
                            <li class="link">
                                <a href="classes/LevelThreeComment.html" data-type="entity-link" >LevelThreeComment</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostEntity.html" data-type="entity-link" >PostEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostNotFound.html" data-type="entity-link" >PostNotFound</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostResponseDto.html" data-type="entity-link" >PostResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostsData.html" data-type="entity-link" >PostsData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileData.html" data-type="entity-link" >ProfileData</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProfileEntity.html" data-type="entity-link" >ProfileEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/SamePassword.html" data-type="entity-link" >SamePassword</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tokens.html" data-type="entity-link" >Tokens</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnsupportedFileType.html" data-type="entity-link" >UnsupportedFileType</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCategoryDto.html" data-type="entity-link" >UpdateCategoryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfile.html" data-type="entity-link" >UpdateProfile</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserPasswordDto.html" data-type="entity-link" >UpdateUserPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEntity.html" data-type="entity-link" >UserEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserNotFound.html" data-type="entity-link" >UserNotFound</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserPostsResponseDto.html" data-type="entity-link" >UserPostsResponseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationException.html" data-type="entity-link" >ValidationException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ValidationFilter.html" data-type="entity-link" >ValidationFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrongEmailPass.html" data-type="entity-link" >WrongEmailPass</a>
                            </li>
                            <li class="link">
                                <a href="classes/WrongVerificationCode.html" data-type="entity-link" >WrongVerificationCode</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BufferedFile.html" data-type="entity-link" >BufferedFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommentMention.html" data-type="entity-link" >CommentMention</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreateComment.html" data-type="entity-link" >CreateComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CreatePost.html" data-type="entity-link" >CreatePost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/EmailVerification.html" data-type="entity-link" >EmailVerification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileInfo.html" data-type="entity-link" >FileInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IComment.html" data-type="entity-link" >IComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtPayload.html" data-type="entity-link" >JwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PostWhereOptions.html" data-type="entity-link" >PostWhereOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Receiver.html" data-type="entity-link" >Receiver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response-1.html" data-type="entity-link" >Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UpdatePost.html" data-type="entity-link" >UpdatePost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserConfirmation.html" data-type="entity-link" >UserConfirmation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserExistence.html" data-type="entity-link" >UserExistence</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserFile.html" data-type="entity-link" >UserFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPersonalData.html" data-type="entity-link" >UserPersonalData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WhereComment.html" data-type="entity-link" >WhereComment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WherePost.html" data-type="entity-link" >WherePost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WherePostLike.html" data-type="entity-link" >WherePostLike</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});