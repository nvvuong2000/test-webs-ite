var EasyAutocomplete = function(E) {
    return E.main = function(t, e) {
        var i, n = new E.Constans,
            g = new E.Configuration(e),
            o = new E.Logger,
            m = new E.Template(e.template),
            r = new E.ListBuilderService(g, E.proccess),
            a = g.equals,
            p = t,
            s = "",
            h = [],
            v = -1;

        function c() {
            var f;

            function d(t, e) {
                return g.get("highlightPhrase") && "" !== e ? (n = t, i = function(t) {
                    return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                }(e), (n + "").replace(new RegExp("(" + i + ")", "gi"), "<b>$1</b>")) : t;
                var n, i
            }
            p.parent().hasClass(n.getValue("WRAPPER_CSS_CLASS")) && (p.next("." + n.getValue("CONTAINER_CLASS")).remove(), p.unwrap()),
                function() {
                    var t = $("<div>"),
                        e = n.getValue("WRAPPER_CSS_CLASS");
                    g.get("theme") && "" !== g.get("theme") && (e += " eac-" + g.get("theme"));
                    g.get("cssClasses") && "" !== g.get("cssClasses") && (e += " " + g.get("cssClasses"));
                    "" !== m.getTemplateClass() && (e += " " + m.getTemplateClass());
                    t.addClass(e), p.wrap(t), !0 === g.get("adjustWidth") && function() {
                        var t = p.outerWidth();
                        p.parent().css("width", t)
                    }()
                }(), (f = $("<div>").addClass(n.getValue("CONTAINER_CLASS"))).attr("id", u()).prepend($("<ul>")), f.on("show.eac", function() {
                    switch (g.get("list").showAnimation.type) {
                        case "slide":
                            var t = g.get("list").showAnimation.time,
                                e = g.get("list").showAnimation.callback;
                            f.find("ul").slideDown(t, e);
                            break;
                        case "fade":
                            t = g.get("list").showAnimation.time, e = g.get("list").showAnimation.callback;
                            f.find("ul").fadeIn(t);
                            break;
                        default:
                            f.find("ul").show()
                    }
                    g.get("list").onShowListEvent()
                }).on("hide.eac", function() {
                    switch (g.get("list").hideAnimation.type) {
                        case "slide":
                            var t = g.get("list").hideAnimation.time,
                                e = g.get("list").hideAnimation.callback;
                            f.find("ul").slideUp(t, e);
                            break;
                        case "fade":
                            t = g.get("list").hideAnimation.time, e = g.get("list").hideAnimation.callback;
                            f.find("ul").fadeOut(t, e);
                            break;
                        default:
                            f.find("ul").hide()
                    }
                    g.get("list").onHideListEvent()
                }).on("selectElement.eac", function() {
                    f.find("ul li").removeClass("selected"), f.find("ul li").eq(v).addClass("selected"), g.get("list").onSelectItemEvent()
                }).on("loadElements.eac", function(t, i, a) {
                    var o = "",
                        e = f.find("ul");
                    e.empty().detach(), h = [];
                    for (var r = 0, s = 0, n = i.length; s < n; s += 1) {
                        var c = i[s].data;
                        if (0 !== c.length) {
                            void 0 !== i[s].header && 0 < i[s].header.length && e.append("<div class='eac-category' >" + i[s].header + "</div>");
                            for (var u = 0, l = c.length; u < l && r < i[s].maxListSize; u += 1) o = $("<li><div class='eac-item'></div></li>"),
                                function() {
                                    var t = u,
                                        e = r,
                                        n = i[s].getValue(c[t]);
                                    o.find(" > div").on("click", function() {
                                        p.val(n).trigger("change"), y(v = e), g.get("list").onClickEvent(), g.get("list").onChooseEvent()
                                    }).mouseover(function() {
                                        y(v = e), g.get("list").onMouseOverEvent()
                                    }).mouseout(function() {
                                        g.get("list").onMouseOutEvent()
                                    }).html(m.build(d(n, a), c[t]))
                                }(), e.append(o), h.push(c[u]), r += 1
                        }
                    }
                    f.append(e), g.get("list").onLoadEvent()
                }), p.after(f), s = $("#" + u()), g.get("placeholder") && p.attr("placeholder", g.get("placeholder"))
        }

        function u() {
            var t = p.attr("id");
            return t = n.getValue("CONTAINER_ID") + t
        }

        function l() {
            s.trigger("show.eac")
        }

        function f() {
            s.trigger("hide.eac")
        }

        function y(t) {
            s.trigger("selectElement.eac", t)
        }

        function d(t, e) {
            s.trigger("loadElements.eac", [t, e])
        }
        E.consts = n, this.getConstants = function() {
            return n
        }, this.getConfiguration = function() {
            return g
        }, this.getContainer = function() {
            return s
        }, this.getSelectedItemIndex = function() {
            return v
        }, this.getItems = function() {
            return h
        }, this.getItemData = function(t) {
            return h.length < t || void 0 === h[t] ? -1 : h[t]
        }, this.getSelectedItemData = function() {
            return this.getItemData(v)
        }, this.build = function() {
            c()
        }, this.init = function() {
            ! function() {
                if (0 === p.length) return o.error("Input field doesn't exist.");
                if (!g.checkDataUrlProperties()) return o.error("One of options variables 'data' or 'url' must be defined.");
                if (!g.checkRequiredProperties()) return o.error("Will not work without mentioned properties.");
                c(), a("autocompleteOff", !0) && p.attr("autocomplete", "off"), p.focusout(function() {
                    var t, e = p.val();
                    g.get("list").match.caseSensitive || (e = e.toLowerCase());
                    for (var n = 0, i = h.length; n < i; n += 1)
                        if (t = g.get("getValue")(h[n]), g.get("list").match.caseSensitive || (t = t.toLowerCase()), t === e) return void y(v = n)
                }), p.off("keyup").keyup(function(t) {
                    switch (t.keyCode) {
                        case 27:
                            f(), p.trigger("blur");
                            break;
                        case 38:
                            t.preventDefault(), 0 < h.length && 0 < v && (--v, p.val(g.get("getValue")(h[v])), y(v));
                            break;
                        case 40:
                            t.preventDefault(), 0 < h.length && v < h.length - 1 && (v += 1, p.val(g.get("getValue")(h[v])), y(v));
                            break;
                        default:
                            if (40 < t.keyCode || 8 === t.keyCode) {
                                var e = p.val();
                                !0 !== g.get("list").hideOnEmptyPhrase || 8 !== t.keyCode || "" !== e ? 0 < g.get("requestDelay") ? (void 0 !== i && clearTimeout(i), i = setTimeout(function() {
                                    n(e)
                                }, g.get("requestDelay"))) : n(e) : f()
                            }
                    }

                    function n(a) {
                        if (!(a.length < g.get("minCharNumber"))) {
                            if ("list-required" !== g.get("data")) {
                                var t = g.get("data"),
                                    e = r.init(t);
                                e = r.updateCategories(e, t), d(e = r.processData(e, a), a), 0 < p.parent().find("li").length ? l() : f()
                            }
                            var n = function() {
                                var t = {},
                                    e = g.get("ajaxSettings") || {};
                                for (var n in e) t[n] = e[n];
                                return t
                            }();
                            void 0 !== n.url && "" !== n.url || (n.url = g.get("url")), void 0 !== n.dataType && "" !== n.dataType || (n.dataType = g.get("dataType")), void 0 !== n.url && "list-required" !== n.url && (n.url = n.url(a), n.data = g.get("preparePostData")(n.data, a), $.ajax(n).done(function(t) {
                                var e, n, i = r.init(t);
                                i = r.updateCategories(i, t), i = r.convertXml(i), e = a, n = t, !1 !== g.get("matchResponseProperty") && ("string" == typeof g.get("matchResponseProperty") ? n[g.get("matchResponseProperty")] !== e : "function" == typeof g.get("matchResponseProperty") && g.get("matchResponseProperty")(n) !== e) || d(i = r.processData(i, a), a), r.checkIfDataExists(i) && 0 < p.parent().find("li").length ? l() : f(), g.get("ajaxCallback")()
                            }).fail(function() {
                                o.warning("Fail to load response data")
                            }).always(function() {}))
                        }
                    }
                }), p.on("keydown", function(t) {
                    if (38 === (t = t || window.event).keyCode) return !(suppressKeypress = !0)
                }).keydown(function(t) {
                    13 === t.keyCode && -1 < v && (p.val(g.get("getValue")(h[v])), g.get("list").onKeyEnterEvent(), g.get("list").onChooseEvent(), v = -1, f(), t.preventDefault())
                }), p.off("keypress"), p.focus(function() {
                    "" !== p.val() && 0 < h.length && (v = -1, l())
                }), p.blur(function() {
                    setTimeout(function() {
                        v = -1, f()
                    }, 250)
                })
            }()
        }
    }, E.eacHandles = [], E.getHandle = function(t) {
        return E.eacHandles[t]
    }, E.inputHasId = function(t) {
        return void 0 !== $(t).attr("id") && 0 < $(t).attr("id").length
    }, E.assignRandomId = function(t) {
        for (var e = ""; e = "eac-" + Math.floor(1e4 * Math.random()), 0 !== $("#" + e).length;);
        elementId = E.consts.getValue("CONTAINER_ID") + e, $(t).attr("id", e)
    }, E.setHandle = function(t, e) {
        E.eacHandles[e] = t
    }, E
}((EasyAutocomplete = function(t) {
    return t.Template = function(t) {
        var e, n, i, a, o, r, s = {
            basic: {
                type: "basic",
                method: function(t) {
                    return t
                },
                cssClass: ""
            },
            description: {
                type: "description",
                fields: {
                    description: "description"
                },
                method: function(t) {
                    return t + " - description"
                },
                cssClass: "eac-description"
            },
            iconLeft: {
                type: "iconLeft",
                fields: {
                    icon: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: "eac-icon-left"
            },
            iconRight: {
                type: "iconRight",
                fields: {
                    iconSrc: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: "eac-icon-right"
            },
            links: {
                type: "links",
                fields: {
                    link: ""
                },
                method: function(t) {
                    return t
                },
                cssClass: ""
            },
            custom: {
                type: "custom",
                method: function() {},
                cssClass: ""
            }
        };

        function c() {
            return ""
        }
        this.getTemplateClass = (e = t) && e.type && e.type && s[e.type] ? (n = s[e.type].cssClass, function() {
            return n
        }) : c, this.build = (i = t) && i.type && i.type && s[i.type] ? (r = (a = i).fields, "description" === a.type ? (o = s.description.method, "string" == typeof r.description ? o = function(t, e) {
            return t + " - <span>" + e[r.description] + "</span>"
        } : "function" == typeof r.description && (o = function(t, e) {
            return t + " - <span>" + r.description(e) + "</span>"
        }), o) : "iconRight" === a.type ? ("string" == typeof r.iconSrc ? o = function(t, e) {
            return t + "<img class='eac-icon' src='" + e[r.iconSrc] + "' />"
        } : "function" == typeof r.iconSrc && (o = function(t, e) {
            return t + "<img class='eac-icon' src='" + r.iconSrc(e) + "' />"
        }), o) : "iconLeft" === a.type ? ("string" == typeof r.iconSrc ? o = function(t, e) {
            return "<img class='eac-icon' src='" + e[r.iconSrc] + "' />" + t
        } : "function" == typeof r.iconSrc && (o = function(t, e) {
            return "<img class='eac-icon' src='" + r.iconSrc(e) + "' />" + t
        }), o) : "links" === a.type ? ("string" == typeof r.link ? o = function(t, e) {
            return "<a href='" + e[r.link] + "' >" + t + "</a>"
        } : "function" == typeof r.link && (o = function(t, e) {
            return "<a href='" + r.link(e) + "' >" + t + "</a>"
        }), o) : "custom" === a.type ? a.method : s.basic.method) : s.basic.method
    }, t
}((EasyAutocomplete = function(i) {
    return i.proccess = function(o, e, t) {
        i.proccess.match = r;
        var n = e.data;
        return n = function(t) {
            o.get("list").sort.enabled && t.sort(o.get("list").sort.method);
            return t
        }(n = function(t) {
            void 0 !== e.maxNumberOfElements && t.length > e.maxNumberOfElements && (t = t.slice(0, e.maxNumberOfElements));
            return t
        }(n = function(t, e) {
            var n = [];
            if (o.get("list").match.enabled)
                for (var i = 0, a = t.length; i < a; i += 1) r(o.get("getValue")(t[i]), e) && n.push(t[i]);
            else n = t;
            return n
        }(n, t)));

        function r(t, e) {
            return o.get("list").match.caseSensitive || ("string" == typeof t && (t = t.toLowerCase()), e = e.toLowerCase()), !!o.get("list").match.method(t, e)
        }
    }, i
}((EasyAutocomplete = function(t) {
    return t.ListBuilderService = function(a, o) {
        function r(n, i) {
            var t = {};
            if (t = "XML" === a.get("dataType").toUpperCase() ? function() {
                    var t, e = {};
                    void 0 !== n.xmlElementName && (e.xmlElementName = n.xmlElementName);
                    void 0 !== n.listLocation ? t = n.listLocation : void 0 !== a.get("listLocation") && (t = a.get("listLocation"));
                    void 0 !== t ? "string" == typeof t ? e.data = $(i).find(t) : "function" == typeof t && (e.data = t(i)) : e.data = i;
                    return e
                }() : function() {
                    var t = {};
                    void 0 !== n.listLocation ? "string" == typeof n.listLocation ? t.data = i[n.listLocation] : "function" == typeof n.listLocation && (t.data = n.listLocation(i)) : t.data = i;
                    return t
                }(), void 0 !== n.header && (t.header = n.header), void 0 !== n.maxNumberOfElements && (t.maxNumberOfElements = n.maxNumberOfElements), void 0 !== a.get("list").maxNumberOfElements && (t.maxListSize = a.get("list").maxNumberOfElements), void 0 !== n.getValue)
                if ("string" == typeof n.getValue) {
                    var e = n.getValue;
                    t.getValue = function(t) {
                        return t[e]
                    }
                } else "function" == typeof n.getValue && (t.getValue = n.getValue);
            else t.getValue = a.get("getValue");
            return t
        }

        function n(t) {
            var e = [];
            return void 0 === t.xmlElementName && (t.xmlElementName = a.get("xmlElementName")), $(t.data).find(t.xmlElementName).each(function() {
                e.push(this)
            }), e
        }
        this.init = function(t) {
            var e = [],
                n = {};
            return n.data = a.get("listLocation")(t), n.getValue = a.get("getValue"), n.maxListSize = a.get("list").maxNumberOfElements, e.push(n), e
        }, this.updateCategories = function(t, e) {
            if (a.get("categoriesAssigned")) {
                t = [];
                for (var n = 0; n < a.get("categories").length; n += 1) {
                    var i = r(a.get("categories")[n], e);
                    t.push(i)
                }
            }
            return t
        }, this.convertXml = function(t) {
            if ("XML" === a.get("dataType").toUpperCase())
                for (var e = 0; e < t.length; e += 1) t[e].data = n(t[e]);
            return t
        }, this.processData = function(t, e) {
            for (var n = 0, i = t.length; n < i; n += 1) t[n].data = o(a, t[n], e);
            return t
        }, this.checkIfDataExists = function(t) {
            for (var e = 0, n = t.length; e < n; e += 1)
                if (void 0 !== t[e].data && t[e].data instanceof Array && 0 < t[e].data.length) return !0;
            return !1
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Constans = function() {
        var e = {
            CONTAINER_CLASS: "easy-autocomplete-container",
            CONTAINER_ID: "eac-container-",
            WRAPPER_CSS_CLASS: "easy-autocomplete"
        };
        this.getValue = function(t) {
            return e[t]
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Logger = function() {
        this.error = function(t) {
            console.log("ERROR: " + t)
        }, this.warning = function(t) {
            console.log("WARNING: " + t)
        }
    }, t
}((EasyAutocomplete = function(t) {
    return t.Configuration = function(o) {
        var r = {
                data: "list-required",
                url: "list-required",
                dataType: "json",
                listLocation: function(t) {
                    return t
                },
                xmlElementName: "",
                getValue: function(t) {
                    return t
                },
                autocompleteOff: !0,
                placeholder: !1,
                ajaxCallback: function() {},
                matchResponseProperty: !1,
                list: {
                    sort: {
                        enabled: !1,
                        method: function(t, e) {
                            return (t = r.getValue(t)) < (e = r.getValue(e)) ? -1 : e < t ? 1 : 0
                        }
                    },
                    maxNumberOfElements: 6,
                    hideOnEmptyPhrase: !0,
                    match: {
                        enabled: !1,
                        caseSensitive: !1,
                        method: function(t, e) {
                            return -1 < t.search(e)
                        }
                    },
                    showAnimation: {
                        type: "normal",
                        time: 400,
                        callback: function() {}
                    },
                    hideAnimation: {
                        type: "normal",
                        time: 400,
                        callback: function() {}
                    },
                    onClickEvent: function() {},
                    onSelectItemEvent: function() {},
                    onLoadEvent: function() {},
                    onChooseEvent: function() {},
                    onKeyEnterEvent: function() {},
                    onMouseOverEvent: function() {},
                    onMouseOutEvent: function() {},
                    onShowListEvent: function() {},
                    onHideListEvent: function() {}
                },
                highlightPhrase: !0,
                theme: "",
                cssClasses: "",
                minCharNumber: 0,
                requestDelay: 0,
                adjustWidth: !0,
                ajaxSettings: {},
                preparePostData: function(t, e) {
                    return t
                },
                loggerEnabled: !0,
                template: "",
                categoriesAssigned: !1,
                categories: [{
                    maxNumberOfElements: 4
                }]
            },
            s = ["ajaxSettings", "template"];

        function n(a, t) {
            ! function t(e, n) {
                for (var i in n) void 0 === e[i] && a.log("Property '" + i + "' does not exist in EasyAutocomplete options API."), "object" == typeof e[i] && -1 === $.inArray(i, s) && t(e[i], n[i])
            }(r, t)
        }
        this.get = function(t) {
                return r[t]
            }, this.equals = function(t, e) {
                return void 0 !== r[n = t] && null !== r[n] && r[t] === e;
                var n
            }, this.checkDataUrlProperties = function() {
                return "list-required" !== r.url || "list-required" !== r.data
            }, this.checkRequiredProperties = function() {
                for (var t in r)
                    if ("required" === r[t]) return logger.error("Option " + t + " must be defined"), !1;
                return !0
            }, this.printPropertiesThatDoesntExist = function(t, e) {
                n(t, e)
            },
            function() {
                "xml" === o.dataType && (o.getValue || (o.getValue = function(t) {
                    return $(t).text()
                }), o.list || (o.list = {}), o.list.sort || (o.list.sort = {}), o.list.sort.method = function(t, e) {
                    return (t = o.getValue(t)) < (e = o.getValue(e)) ? -1 : e < t ? 1 : 0
                }, o.list.match || (o.list.match = {}), o.list.match.method = function(t, e) {
                    return -1 < t.search(e)
                });
                if (void 0 !== o.categories && o.categories instanceof Array) {
                    for (var t = [], e = 0, n = o.categories.length; e < n; e += 1) {
                        var i = o.categories[e];
                        for (var a in r.categories[0]) void 0 === i[a] && (i[a] = r.categories[0][a]);
                        t.push(i)
                    }
                    o.categories = t
                }
            }(), !0 === (r = function t(e, n) {
                var i = e || {};
                for (var a in e) void 0 !== n[a] && null !== n[a] && ("object" != typeof n[a] || n[a] instanceof Array ? i[a] = n[a] : t(e[a], n[a]));
                return void 0 !== n.data && null !== n.data && "object" == typeof n.data && (i.data = n.data), i
            }(r, o)).loggerEnabled && n(console, o), void 0 !== o.ajaxSettings && "object" == typeof o.ajaxSettings ? r.ajaxSettings = o.ajaxSettings : r.ajaxSettings = {},
            function() {
                if ("list-required" !== r.url && "function" != typeof r.url) {
                    var t = r.url;
                    r.url = function() {
                        return t
                    }
                }
                if (void 0 !== r.ajaxSettings.url && "function" != typeof r.ajaxSettings.url) {
                    t = r.ajaxSettings.url;
                    r.ajaxSettings.url = function() {
                        return t
                    }
                }
                if ("string" == typeof r.listLocation) {
                    var e = r.listLocation;
                    "XML" === r.dataType.toUpperCase() ? r.listLocation = function(t) {
                        return $(t).find(e)
                    } : r.listLocation = function(t) {
                        return t[e]
                    }
                }
                if ("string" == typeof r.getValue) {
                    var n = r.getValue;
                    r.getValue = function(t) {
                        return t[n]
                    }
                }
                void 0 !== o.categories && (r.categoriesAssigned = !0)
            }()
    }, t
}(EasyAutocomplete || {})) || {})) || {})) || {})) || {})) || {})) || {});
! function(i) {
    i.fn.easyAutocomplete = function(n) {
        return this.each(function() {
            var t = i(this),
                e = new EasyAutocomplete.main(t, n);
            EasyAutocomplete.inputHasId(t) || EasyAutocomplete.assignRandomId(t), e.init(), EasyAutocomplete.setHandle(e, t.attr("id"))
        })
    }, i.fn.getSelectedItemIndex = function() {
        var t = i(this).attr("id");
        return void 0 !== t ? EasyAutocomplete.getHandle(t).getSelectedItemIndex() : -1
    }, i.fn.getItems = function() {
        var t = i(this).attr("id");
        return void 0 !== t ? EasyAutocomplete.getHandle(t).getItems() : -1
    }, i.fn.getItemData = function(t) {
        var e = i(this).attr("id");
        return void 0 !== e && -1 < t ? EasyAutocomplete.getHandle(e).getItemData(t) : -1
    }, i.fn.getSelectedItemData = function() {
        var t = i(this).attr("id");
        return void 0 !== t ? EasyAutocomplete.getHandle(t).getSelectedItemData() : -1
    }
}(jQuery);